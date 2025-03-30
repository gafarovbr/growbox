interface RectangleProps {
  value: number;
  maxValue: number;
  minValue: number;
}

const Rectangle: React.FC<RectangleProps> = ({ value, minValue, maxValue }) => {
  // Normalize the value to a percentage (0 - 100)
  const percentage = ((value - minValue) / (maxValue - minValue)) * 100;

  // Calculate color intensity
  const red = Math.abs(50 - percentage) * 5.1; // More red towards the edges
  const green = 255 - red; // More green towards the middle

  const backgroundColor = `rgb(${red}, ${green}, 0)`;

  return (
    <>
      <p className="font-normal">текущее значение: {value}</p>
      <div className="w-[100%] h-[25px] border-[1px] border-gray-700 rounded-lg overflow-hidden">
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor }}
        />
      </div>
      <div className="flex justify-between font-normal ">
        <span>{minValue}</span>
        <span>{maxValue}</span>
      </div>
    </>
  );
};

export default Rectangle