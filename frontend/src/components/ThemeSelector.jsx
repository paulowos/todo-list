export default function ThemeSelector() {
  return (
    <label htmlFor="themeSelect" className="font-bold label">
      Tema:
      <select
        id="themeSelect"
        className="select select-ghost select-xs"
        data-choose-theme>
        <option value={''}>Sistema</option>
        <option value={'dark'}>Dark</option>
        <option value={'light'}>Light</option>
        <option value={'cupcake'}>Cupcake</option>
        <option value={'corporate'}>Corporate</option>
        <option value={'synthwave'}>Synthwave</option>
        <option value={'valentine'}>Valentine</option>
        <option value={'halloween'}>Halloween</option>
        <option value={'garden'}>Garden</option>
        <option value={'forest'}>Forest</option>
        <option value={'lofi'}>Lofi</option>
        <option value={'pastel'}>Pastel</option>
        <option value={'fantasy'}>Fantasy</option>
        <option value={'wireframe'}>Wireframe</option>
        <option value={'dracula'}>Dracula</option>
        <option value={'cmyk'}>CMYK</option>
        <option value={'autumn'}>Autumn</option>
        <option value={'business'}>Business</option>
        <option value={'acid'}>Acid</option>
        <option value={'night'}>Night</option>
        <option value={'winter'}>Winter</option>
      </select>
    </label>
  );
}
