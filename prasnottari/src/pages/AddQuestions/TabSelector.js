import React from 'react';
import { Tabs, Tab, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const TabsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#347e43",
  borderRadius: "12px",
  padding: "4px",
  position: "relative",
}));

const CustomTab = styled(Tab)(({ selected }) => ({
  borderRadius: "8px",
  backgroundColor: selected ? "white" : "transparent",
  color: selected ? "black" : "white",
  fontWeight: selected ? "bold" : "normal",
  margin: "0 2px",
  transition: "background-color 0.3s ease",
}));

const TabSelector = ({ selectedTab, handleTabChange }) => (
  <TabsContainer>
    <Tabs value={selectedTab} onChange={handleTabChange} centered sx={{ width: "100%" }}>
      <CustomTab label="Add Question" selected={selectedTab === 0} />
      <CustomTab label="Add Question Paper" selected={selectedTab === 1} />
    </Tabs>
  </TabsContainer>
);

export default TabSelector;
