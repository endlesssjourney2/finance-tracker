import s from "./CustomDrawer.module.css";
import type { FC } from "react";
import { Divider, Drawer } from "@mui/material";

type CustomDrawerProps = {
  onClose: () => void;
  open: boolean;
  content: React.ReactNode;
};

const CustomDrawer: FC<CustomDrawerProps> = ({ onClose, open, content }) => {
  const DrawerList = (
    <div className={s.drawer}>
      <div className={s.drawerHeader}>
        <h2>Choose a page</h2>
      </div>
      <Divider sx={{ background: "#ffffffa1" }} />
      <div className={s.drawerContent}>{content}</div>
    </div>
  );

  return (
    <Drawer
      onClose={onClose}
      open={open}
      anchor="right"
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "#1e1e1e",
          color: "#fff",
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
};

export default CustomDrawer;
