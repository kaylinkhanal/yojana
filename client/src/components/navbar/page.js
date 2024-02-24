"use client";
import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { logoutUser } from "@/redux/reducerSlices/userSlice";
import {Badge} from "@nextui-org/react";

import Link from "next/link";
const loggedInConfig = {
  true: [
    { label: "Your Work", href: "/my-work" },
    { label: "Members", href: "/members" },
    { label: "Projects", href: "/projects" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  false: [
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
  ],
};
const NotificationIcon = ({size, height, width, ...props}) => {
  return (
    <svg
      fill="none"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        clipRule="evenodd"
        d="M18.707 8.796c0 1.256.332 1.997 1.063 2.85.553.628.73 1.435.73 2.31 0 .874-.287 1.704-.863 2.378a4.537 4.537 0 01-2.9 1.413c-1.571.134-3.143.247-4.736.247-1.595 0-3.166-.068-4.737-.247a4.532 4.532 0 01-2.9-1.413 3.616 3.616 0 01-.864-2.378c0-.875.178-1.682.73-2.31.754-.854 1.064-1.594 1.064-2.85V8.37c0-1.682.42-2.781 1.283-3.858C7.861 2.942 9.919 2 11.956 2h.09c2.08 0 4.204.987 5.466 2.625.82 1.054 1.195 2.108 1.195 3.745v.426zM9.074 20.061c0-.504.462-.734.89-.833.5-.106 3.545-.106 4.045 0 .428.099.89.33.89.833-.025.48-.306.904-.695 1.174a3.635 3.635 0 01-1.713.731 3.795 3.795 0 01-1.008 0 3.618 3.618 0 01-1.714-.732c-.39-.269-.67-.694-.695-1.173z"
        fill='currentColor'
        fillRule="evenodd"
      />
    </svg>
  );
};

const page = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, userDetails } = useSelector((state) => state.user);
  const AuthButtons = () => {
    return (
      <div className="flex items-center gap-4">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/register" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </div>
    );
  };
  return (
    <header className="sticky top-0 z-20 border-b border-gray-500">
      <Navbar>
        <NavbarBrand>
          <Image src="/yojana-logo.png" width={110} height={110} />
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {loggedInConfig[isLoggedIn]?.map((item, id) => {
            return (
              <NavbarItem key={id}>
                <Link color="foreground" href={item.href}>
                  {item.label}
                </Link>
              </NavbarItem>
            );
          })}
        </NavbarContent>
        <NavbarContent justify="end">
        <Badge content="99+" shape="circle" color="danger">
            <Button
              radius="full"
              isIconOnly
              aria-label="more than 99 notifications"
              variant="light"
            >
              <NotificationIcon size={24} />
            </Button>
          </Badge>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Image src={`http://localhost:8080/uploads/avatar/${userDetails.avatar}`} width={40} height={40} alt="test" />
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{userDetails.email}</p>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    <Link color="foreground" href="/profile" >
                      Profile
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="team_settings">
                  <Link color="foreground" href="/change-password" >
                      Change Password
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={() => dispatch(logoutUser())}
                  >
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <AuthButtons />
          )}
        </NavbarContent>
      </Navbar>
    </header>
  );
};

export default page;
