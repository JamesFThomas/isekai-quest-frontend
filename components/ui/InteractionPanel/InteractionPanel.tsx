'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export interface PanelOption {
  id: number; // Unique identifier for the option
  name: string;
  pageRoute: string; // Optional route for navigation
  src?: string; // Optional image source for the panel
  altText?: string; // Optional alt text for the image
  disabled?: boolean; // Optional flag to disable the option
}

type InteractionPanelProps = {
  // Define any props if needed
  title: string;
  optionArray: PanelOption[];
};

const InteractionPanel = ({ title, optionArray }: InteractionPanelProps) => {
  const router = useRouter();

  const handleOptionClick = (option: PanelOption) => {
    console.log(`${option.name} clicked`);
    // Add any additional logic for handling option clicks
    if (option.pageRoute) {
      router.push(option.pageRoute); // Navigate to the specified route if provided
    }
  };

  return (
    <div className='interactionPanel-container flex flex-col items-center justify-center gap-3 w-full'>
      <header
        className='panel-title text-center text-4xl text-white p-3.5  bg-[url("/background_images/parchment_paper.png")] bg-cover bg-no-repeat bg-center'
        style={{
          // backgroundColor: '#C87D7D',
          width: '100%',
        }}
      >
        {title}
      </header>
      <div
        className='options-grid grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'
        style={{
          width: '100%',
          // backgroundColor: 'white',
        }}
      >
        {optionArray.map((option) => (
          <button
            className={`flex flex-col items-center justify-center ${
              option.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
            key={option.id}
            onClick={() => handleOptionClick(option)}
            disabled={option.disabled}
          >
            {option.src ? (
              <Image
                key={option.id}
                src={option.src}
                alt={option.altText || option.name}
                width={200}
                height={200}
                className='flex items-center justify-center'
              />
            ) : (
              <div
                className='bg-gray-200 flex items-center justify-center'
                style={{ width: '300px', height: '300px' }}
              >
                <span className='text-gray-500'>No Image</span>
              </div>
            )}
            <span className='text-center text-sm text-white font-bold mb-2'>
              {option.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InteractionPanel;
