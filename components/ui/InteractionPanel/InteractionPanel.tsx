'use client';

interface PanelOption {
  name: string;
  // Add other properties as needed
}

type InteractionPanelProps = {
  // Define any props if needed
  title: string;
  optionArray: PanelOption[];
  imageSrc?: string; // Optional image source for the panel
  route?: string; // Optional route for navigation
};

// const options: PanelOption[] = [{ name: 'Map' }, { name: 'Party' }];

const InteractionPanel = ({ title, optionArray }: InteractionPanelProps) => {
  const handleOptionClick = (option: PanelOption) => {
    console.log(`${option.name} clicked`);
    // Add any additional logic for handling option clicks
  };

  return (
    <div className='interactionPanel-container flex flex-col items-center justify-center gap-3 w-full'>
      <header
        className='panel-title text-center text-4xl text-white p-3.5'
        style={{
          backgroundColor: '#C87D7D',
          width: '100%',
        }}
      >
        {title}
      </header>
      <div
        className='options-grid grid grid-cols-1 sm:grid-cols-2 gap-4'
        style={{
          width: '100%',
        }}
      >
        {optionArray.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(option)}>
            {/* Will contain an image for each option to keep btn sizes standard*/}
            <div className='panel-option w-full aspect-square bg-[#C87D7D] text-white flex items-center justify-center'>
              {option.name}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default InteractionPanel;
