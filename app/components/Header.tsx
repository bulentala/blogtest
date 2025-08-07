import Logo from "./Logo";

export default function Header() {
  return (
    <header className="test grid grid-cols-[auto_1fr_auto] items-center">
      <Logo />
      <div className="test col-start-3"></div>
    </header>
  );
}
