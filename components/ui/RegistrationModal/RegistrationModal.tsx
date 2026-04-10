"use client";

import { Dispatch, SetStateAction, useState } from "react";

import Image from "next/image";

import { NewPlayerData } from "../../screens/CreateCharacterScreen/CreateCharacterScreen";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { User } from "@/lib/features/auth/AuthSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {
  Character,
  characterClass,
  CharacterStateSnapshot,
} from "@/types/character";
import { CreateAccountInput, SessionRefreshData } from "@/types/persistence";
import {
  createAccountLocalStorage,
  saveSessionRefreshData,
} from "@/lib/persistence/localPersistence";

interface RegistrationModalProps {
  isOpen: boolean;
  playerData?: NewPlayerData;
  closeModal: Dispatch<SetStateAction<boolean>>;
  handleCharcaterCreationAndLogin: (
    user: User,
    characterData: Character,
    location: string,
    characterSnapshot: CharacterStateSnapshot,
  ) => void;
}

export default function RegistrationModal({
  isOpen,
  playerData,
  closeModal,
  handleCharcaterCreationAndLogin,
}: RegistrationModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const setOpen = () => {
    closeModal(!isOpen);
  };

  const handleRegistration = async () => {
    setIsLoading(true);

    try {
      // create mapping of input data for local storage persistence
      const accountInputData: CreateAccountInput = {
        email: playerData?.userName ?? "",
        password: playerData?.password ?? "",
        characterName: playerData?.characterName ?? "",
        avatar: playerData?.avatar ?? "/character_avatars/default_avatar.png",
        characterClass: playerData?.characterClass as characterClass,
      };

      // call createAccountLocalStorage method
      const response = await createAccountLocalStorage(accountInputData);

      // handle failed response
      if (!response.success) {
        console.error("Account creation failed:", response.message);
        setIsLoading(false);
        return;
      }

      // success path
      if (
        response.data.account &&
        response.data.player &&
        response.data.characterData
      ) {
        // destructure response data
        const { account, player, characterData, progressionData } =
          response.data;

        // construct user object for authentication state in redux store
        const user: User = {
          accountId: account.id,
          email: account.email,
          playerId: player.id,
          characters: [characterData],
        };

        //construct character snapshot for saving game porgression in redux store
        const characterSnapshot = {
          characterData: characterData,
          progressionData: progressionData,
        };

        // new characters always start in the same location for now
        const characterLocation = "StartsVille";

        // Create the session refresh data object to be saved in local storage for session persistence on refresh
        const sessionRefreshData: SessionRefreshData = {
          accountId: account.id,
          email: account.email,
          playerId: player.id,
          characterSnapshot: characterSnapshot,
        };

        // Save the session refresh data to local storage
        const refreshData = await saveSessionRefreshData(sessionRefreshData);

        if (!refreshData.success) {
          console.error(
            "Failed to save session refresh data:",
            refreshData.message,
          );
          // We can choose to continue even if saving session data fails, or handle it as needed
        }

        // log that refresh data was saved successfully
        console.log("Session refresh data saved successfully.");

        // call the character creation and login handler
        handleCharcaterCreationAndLogin(
          user,
          response.data.characterData,
          characterLocation,
          characterSnapshot,
        );

        // stop loading BEFORE navigation
        setIsLoading(false);

        // close modal
        setOpen();
      }
    } catch (error) {
      console.error("Unexpected error during registration:", error);
      setIsLoading(false);
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
              className='relative transform overflow-hidden text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
              style={{
                backgroundColor: "#C87D7D",
              }}
            >
              <div
                className=' px-4 pt-5 pb-4 sm:p-6 sm:pb-4 bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
                style={{
                  backgroundColor: "#C87D7D",
                }}
              >
                <div className="items-center">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="font-semibold text-white text-2xl item"
                    >
                      Your Player Data!
                    </DialogTitle>
                    <div className="playerData-grid mt-2 flex flex-col md:flex-row gap-4">
                      {/* Avatar */}
                      <figure className="character-image w-full md:w-1/3 flex items-center justify-center">
                        <Image
                          alt="Chosen player avatar"
                          src={
                            playerData?.avatar ||
                            "/character_avatars/default_avatar.png"
                          }
                          width={300}
                          height={300}
                        />
                      </figure>

                      {/* Player info */}
                      <div className="flex-1 flex flex-col gap-3 justify-center">
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <label className="text-white text-sm font-bold text-center">
                            Character Name:
                          </label>
                          <div className="text-white px-3 py-2 text-center">
                            {playerData?.characterName || "—"}
                          </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <label className="text-white text-sm font-bold text-center">
                            User Name:
                          </label>
                          <div className="text-white px-3 py-2 text-center">
                            {playerData?.userName || "—"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleRegistration}
                  className="inline-flex w-full justify-center rounded-full px-3 py-2 text-sm font-semibold text-white sm:ml-3 hover:cursor-pointer"
                  style={{
                    backgroundColor: "#8E9CC9",
                    flex: 1,
                    flexBasis: 0,
                  }}
                >
                  {isLoading ? <LoadingSpinner /> : "Create"}
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
                  Back
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
