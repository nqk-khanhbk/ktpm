import { BsBell, BsChatDots, BsChevronDown } from 'react-icons/bs';
import './header.css';
const Header = () => {
  return (
    <div className="header">
      <div className="header_left">
        <div className="header_left-image">
          <img src="/assets/images/hust.png" alt="logo" />
        </div>
        <div className="header_left-title">
          <h5>BK-ELEARNING MANAGEMENT SYSTEM</h5>
          <span> HANOI UNIVERSITY OF SCIENCE AND TECHNOLOGY</span>
        </div>
      </div>

      <div className="header_right">
        <BsBell className="icon" />
        <BsChatDots className="icon" />
        <div className="user_info">
          <div className="avatar"></div>
          <span className="username">Người dùng 1</span>
          <BsChevronDown className="dropdown-icon" />
        </div>
      </div>
    </div>
  );
};

export default Header;
