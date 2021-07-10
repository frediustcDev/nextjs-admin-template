import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { DefaultTheme } from "styled-components";
import { LayoutHeader } from "@paljs/ui/Layout";
import { Actions } from "@paljs/ui/Actions";
import ContextMenu from "@paljs/ui/ContextMenu";
import User from "@paljs/ui/User";
import { breakpointDown } from "@paljs/ui/breakpoints";
import { Button } from "@paljs/ui/Button";
import { AUTH_CLIENT } from "../server/FirebaseClient";

const HeaderStyle = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  ${breakpointDown("sm")`
    .right{
      display: none;
    }
  `}
  .right > div {
    height: auto;
    display: flex;
    align-content: center;
  }
  .logo {
    font-size: 1.25rem;
    white-space: nowrap;
    text-decoration: none;
  }
  .left {
    display: flex;
    align-items: center;
    .github {
      font-size: 18px;
      margin-right: 5px;
    }
  }
`;

interface HeaderProps {
  toggleSidebar: () => void;
  theme: {
    set: (value: DefaultTheme["name"]) => void;
    value: DefaultTheme["name"];
  };
  changeDir: () => void;
  dir: "rtl" | "ltr";
}

const Header: React.FC<HeaderProps> = (props) => {
  const router = useRouter();

  return (
    <LayoutHeader fixed>
      <HeaderStyle>
        <Actions
          size="Medium"
          actions={[
            {
              icon: { name: "menu-2-outline" },
              url: {
                onClick: props.toggleSidebar,
              },
            },
            {
              content: (
                <Link href="/">
                  <a className="logo">Genese</a>
                </Link>
              ),
            },
          ]}
        />
        <div style={{ display: "flex" }}>
          <Actions
            size="Small"
            className="right"
            actions={[
              {
                content: (
                  <ContextMenu
                    nextJs
                    style={{ cursor: "pointer" }}
                    placement="bottom"
                    currentPath={router.pathname}
                    items={[{ title: "Compte", link: { href: "/account" } }]}
                    Link={Link}
                  >
                    <User
                      image="url('/icons/icon-72x72.png')"
                      name="Genese Administrator"
                      title="Administrator"
                      size="Medium"
                    />
                  </ContextMenu>
                ),
              },
            ]}
          />
          <Button
            onClick={async () => await AUTH_CLIENT.signOut()}
            status="Danger"
          >
            Deconnection
          </Button>
        </div>
      </HeaderStyle>
    </LayoutHeader>
  );
};
export default Header;
