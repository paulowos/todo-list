export default function ThemeSelector() {
  return (
    <select className="select select-ghost select-sm" data-choose-theme>
      <option value={'dark'}>Dark</option>
      <option value={'light'}>Light</option>
    </select>
  );
}
