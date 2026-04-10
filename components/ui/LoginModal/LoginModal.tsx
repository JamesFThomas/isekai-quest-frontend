"use client";

import { Dispatch, SetStateAction, useState } from "react";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import { User } from "@/lib/features/auth/AuthSlice";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import {
  authenticateAccountLocalStorage,
  loadPlayerSaveDataLocalStorage,
  saveSessionRefreshData,
} from "@/lib/persistence/localPersistence";

import { Character, CharacterStateSnapshot } from "@/types/character";
import { SessionRefreshData } from "@/types/persistence";

interface LoginModalProps {
  isOpen: boolean;
  closeModal: Dispatch<SetStateAction<boolean>>;
  handleLoginAndLoadCharacter: (
    user: User,
    characterData: Character,
    location: string,
    characterSnapshot: CharacterStateSnapshot,
  ) => void;
}

export default function LoginModal({
  isOpen,
  closeModal,
  handleLoginAndLoadCharacter,
}: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const valuesAreValid =
    !usernameError && !passwordError && username && password;

  const validateUsername = (): void => {
    if (username.trim() === "") {
      setUsernameError("Username is required");
    } else if (!emailPattern.test(username)) {
      setUsernameError("Username should be an email@domain.com format");
    } else {
      setUsernameError("");
    }
  };

  const validatePassword = (): void => {
    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else if (password.length <= 6) {
      setPasswordError("Password must be at least 7 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleBlur = (field: "username" | "password") => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "username") {
      validateUsername();
    }

    if (field === "password") {
      validatePassword();
    }
  };

  const setOpen = () => {
    closeModal(!isOpen);
  };

  const handleLoginClick = async () => {
    validateUsername();
    validatePassword();

    // if no errors with input validation, proceed with authentication flow
    if (!usernameError && !passwordError) {
      setIsLoading(true);

      // create credentials object with username and password and pass to authentication method
      const loginCredentials = {
        email: username,
        password: password,
      };

      // authenticate user with login credentials
      const accountResponse =
        await authenticateAccountLocalStorage(loginCredentials);

      // failure - display error message to user and allow them to try again
      if (!accountResponse.success) {
        console.error("Authentication failed:", accountResponse.message);

        // create UI toast or error display later
        setIsLoading(false);
        return;
      }

      // use accountResponse.account.id to load character data and progression data from local storage, then dispatch to redux
      const loadPlayerSaveInput = {
        accountId: accountResponse.data.account?.id || "",
      };

      // load player save data from local storage
      const playerSaveResponse =
        await loadPlayerSaveDataLocalStorage(loadPlayerSaveInput);

      if (!playerSaveResponse.success) {
        console.error(
          "Failed to load player save data:",
          playerSaveResponse.message,
        );

        setIsLoading(false);

        return;

        // create UI toast or error display later
      }

      // destructure values from local storage response
      const { account } = accountResponse.data;
      const { characterData, player, progressionData } =
        playerSaveResponse.data;

      if (!account || !player || !characterData || !progressionData) {
        console.error(
          "Failed to load player save data:",
          playerSaveResponse.message,
        );

        setIsLoading(false);

        return;

        // create UI toast or error display later
      }

      // lCreate user object for authentication
      if (account && player && characterData && progressionData?.currentTown) {
        const user: User = {
          accountId: account?.id,
          email: account?.email,
          playerId: player.id,
          characters: [characterData],
        };

        // construct character snapshot for saving game progression in redux store
        const characterSnapshot: CharacterStateSnapshot = {
          characterData,
          progressionData,
        };

        // Create the session refresh data object to be saved in local storage for session persistence on refresh
        const sessionRefreshData: SessionRefreshData = {
          accountId: account.id,
          playerId: player.id,
          characterSnapshot: characterSnapshot,
        };

        // Save the session refresh data to local storage
        const refreshData = await saveSessionRefreshData(sessionRefreshData);

        // log error if saving session refresh data fails, but continue with login flow since authentication and character load were successful
        if (!refreshData.success) {
          console.error(
            "Failed to save session refresh data:",
            refreshData.message,
          );
        }

        // log that refresh data was saved successfully
        console.log("Session refresh data saved successfully.");

        // call the handleLoginAndLoadCharacter function with the loaded character data and location, only if characterData exists
        handleLoginAndLoadCharacter(
          user,
          characterData,
          progressionData.currentTown,
          characterSnapshot,
        );

        setIsLoading(false);

        setOpen();
      }
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onClose={() => {}} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
            <DialogPanel
              transition
              className='relative transform overflow-hidden text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95  bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
            >
              <div className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'>
                <div className="items-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="font-semibold text-white text-2xl item"
                    >
                      Continue your quest!
                    </DialogTitle>
                    <div className="mt-2">
                      <div className="mb-4">
                        <label className="block text-white text-sm font-bold mb-2">
                          Username
                        </label>
                        <input
                          className="bg-white shadow appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="email"
                          placeholder="email@address.com "
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          onBlur={() => handleBlur("username")}
                          onFocus={() =>
                            setTouched((prev) => ({ ...prev, username: true }))
                          }
                        />
                        {touched.username && usernameError && (
                          <p className="text-red-800 font-bold text-sm mt-1">
                            {usernameError}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-white text-sm font-bold mb-2">
                          Password
                        </label>
                        <input
                          className="bg-white shadow appearance-none rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
                          id="password"
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          onBlur={() => handleBlur("password")}
                          onFocus={() =>
                            setTouched((prev) => ({
                              ...prev,
                              password: true,
                            }))
                          }
                        />
                        {touched.password && passwordError && (
                          <p className="text-red-800 font-bold text-sm mt-1">
                            {passwordError}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  disabled={!valuesAreValid}
                  onClick={handleLoginClick}
                  className="inline-flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold text-white sm:ml-3 hover:cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: !valuesAreValid ? "gray-400" : "#8E9CC9",
                    flex: 1,
                    flexBasis: 0,
                  }}
                >
                  {isLoading ? <LoadingSpinner /> : "Login"}
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={setOpen}
                  className="mt-3 inline-flex w-full justify-center rounded-full bg-white px-3 py-2 text-sm font-semibold text-white sm:mt-0 hover:cursor-pointer"
                  style={{
                    backgroundColor: "#8E9CC9",
                    flex: 1,
                    flexBasis: 0,
                  }}
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
