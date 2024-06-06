import "./NavbarToggle.css";
import mainStore from "../../../store/mainStore";
function NavbarToggle() {
  const { isNavbarOpen, setIsNavbarOpen } = mainStore();
  return (
    <div
      className={`md:hidden relative w-8 cursor-pointer h-[20px] ${
        isNavbarOpen ? "toggle-open" : ""
      }`}
      onClick={setIsNavbarOpen}
    >
      <span className="bar bottom-[calc(50%+7px+2.5px/2)] transition-[bottom,margin,transform] delay-[calc(0s+0.35s),0s,0s]"></span>
      <span className="bar top-[calc(50%-2.5px/2)] transition-[top,opacity] duration-[0.35s] delay-[calc(0s+0.35s*1.3),calc(0s+0.35s*1.3)]"></span>
      <span className="bar top-[calc(50%+7px+2.5px/2)] transition-[top,transform] delay-0"></span>
    </div>
  );
}

export default NavbarToggle;
