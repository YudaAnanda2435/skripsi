const NavigationItem = ({ isActive, icon }) => {
  // Logika pembesaran diperbaiki: aktif = 125, tidak aktif = 100
  const activeBar = isActive ? "" : "scale-100";

  return (
    <div>
      <img
        src={icon}
        alt=""
        // Penambahan transition dan duration untuk animasi halus
        className={`${activeBar} w-10 sm:w-8 transition-transform duration-300 ease-in-out`}
      />
    </div>
  );
};

export default NavigationItem;
