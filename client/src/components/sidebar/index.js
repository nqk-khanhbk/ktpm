import React from 'react';
import './sidebar.css'
import { NavLink } from 'react-router-dom';
import {
  BsGrid,
  BsMortarboard,
  BsPerson,
  BsCalendar,
  BsGear,
  BsFileEarmarkText,
  BsListCheck,
  BsDatabase,
  BsPeople,
  BsClipboardCheck
} from 'react-icons/bs';

const menuItems = [
  {
    section: null,
    items: [
      { icon: <BsGrid />, label: 'Tổng quan', to: '/tong-quan' }
    ]
  },
  {
    section: 'Quản lý khóa học',
    items: [
      { icon: <BsMortarboard />, label: 'Học phần', to: '/hoc-phan' },
      { icon: <BsPerson />, label: 'Lớp học', to: '/lop-hoc' },
      { icon: <BsCalendar />, label: 'Kỳ học', to: '/ky-hoc' }
    ]
  },
  {
    section: 'Quản lý hệ thống',
    items: [
      { icon: <BsGear />, label: 'Cấu hình', to: '/cau-hinh' },
      { icon: <BsFileEarmarkText />, label: 'Báo cáo', to: '/bao-cao' }
    ]
  },
  {
    section: 'Cài đặt',
    items: [
      { icon: <BsListCheck />, label: 'Danh mục', to: '/danh-muc' },
      { icon: <BsDatabase />, label: 'Dữ liệu eHUST', to: '/du-lieu-ehust' },
      { icon: <BsPeople />, label: 'Người dùng', to: '/nguoi-dung' },
      { icon: <BsClipboardCheck />, label: 'Vai trò', to: '/vai-tro' }
    ]
  }
];

const SideBar = () => {
  return (
    <div className="sidebar">
      {menuItems.map((item, index) => (
        <div key={index}>
          {item.section && <div className="sidebar-section">{item.section}</div>}
          {item.items.map((item, i) => (
            <NavLink
              key={i}
              to={item.to}
              className={({ isActive }) =>
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              <div className="sidebar-icon">{item.icon}</div>
              <div className='sidebar-text'>{item.label}</div>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
