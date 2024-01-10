"use client";

import React, { useRef, useState } from "react";
import Tree from "react-d3-tree";
import orgChartJson from "./org-chart.json";
import { useCenteredTree } from "./helpers";
import "./styles.css";
import Image from "next/image";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import MapsHomeWorkRoundedIcon from "@mui/icons-material/MapsHomeWorkRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const containerStyles = {
  width: "100vw",
  height: "100vh",
};

// Here we're using `renderCustomNodeElement` render a component that uses
// both SVG and HTML tags side-by-side.
// This is made possible by `foreignObject`, which wraps the HTML tags to
// allow for them to be injected into the SVG namespace.
const renderForeignObjectNode = ({
  nodeDatum,
  toggleNode,
  foreignObjectProps,
  handleMenuClick,
  anchorEl,
}: any) => (
  <g className="">
    <circle r={8}></circle>

    <foreignObject {...foreignObjectProps} className="">
      <div className="flex justify-center">
        <div className="w-52 bg-[#F4F4F4]  border-b-[#D95B3F] border-2 rounded-sm ">
          {/* three dot section */}
          <div className="flex justify-end">
            <IconButton
              aria-label="delete"
              sx={{ padding: "2px" }}
              onClick={(e) => handleMenuClick(e, nodeDatum)}
            >
              <MoreHorizRoundedIcon />
            </IconButton>

            {/* Menu */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClick(null)}
            >
              <MenuItem>{nodeDatum.name}</MenuItem>
              <MenuItem>{nodeDatum.position}</MenuItem>

              {nodeDatum.attributes && (
                <MenuItem>{nodeDatum.attributes.department}</MenuItem>
              )}
            </Menu>
          </div>
          {/* Profile and Description */}
          <div className="mx-4 flex items-center mb-5">
            {/* Image */}
            <div className="w-14 h-14 bg-[#DBFAEE] rounded-full relative mr-2">
              <div className="flex justify-center items-center h-full">
                <Image
                  src={"/admin-profile.avif"}
                  width={"55"}
                  height={"55"}
                  alt={"Profile"}
                  className="rounded-full"
                />
              </div>
            </div>
            {/* Text */}
            <div className="">
              <h1 className="text-[14px] font-semibold">{nodeDatum.name}</h1>
              <p className="text-[8px] text-[#69B36C] text-start">
                {nodeDatum.position}
              </p>
            </div>
          </div>
          {/* Footer Card */}
          <div className="flex justify-center mb-[-10px]">
            <div className="bg-[#ffffff] w-40 h-8 rounded-full z-30 shadow-md">
              <div className="mt-[5px] flex">
                <div className="flex items-center ml-4">
                  <MapsHomeWorkRoundedIcon fontSize="small" />
                  <p className="text-[10px] ml-2">111</p>
                </div>

                <div className="flex items-center ml-4">
                  <SupervisedUserCircleRoundedIcon fontSize="small" />
                  <p className="text-[10px] ml-2">111</p>
                </div>

                <div className="flex justify-end ml-4">
                  <IconButton aria-label="delete" sx={{ padding: "2px" }}>
                    {nodeDatum.children && (
                      <button style={{ width: "100%" }} onClick={toggleNode}>
                        {nodeDatum.__rd3t.collapsed ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownRoundedIcon />
                        )}
                      </button>
                    )}
                  </IconButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </foreignObject>
  </g>
);

export default function App() {
  const [translate, containerRef] = useCenteredTree();
  const nodeSize = { x: 200, y: 200 };
  const foreignObjectProps = { width: 200, height: 9000, x: 10 };
  const divRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement> | null,
    nodeDatum: any
  ) => {
    setAnchorEl(event ? event.currentTarget : null);
    console.log(nodeDatum?.name);
  };

  return (
    <div style={containerStyles} ref={divRef}>
      <Tree
        data={orgChartJson}
        translate={translate}
        nodeSize={nodeSize}
        renderCustomNodeElement={(rd3tProps: any) =>
          renderForeignObjectNode({
            ...rd3tProps,
            foreignObjectProps,
            handleMenuClick,
            anchorEl,
          })
        }
        orientation="horizontal"
        pathFunc="step"
      />
    </div>
  );
}
