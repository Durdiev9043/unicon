import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { DialogAdd } from "../../components/common/modalAdd";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: theme.spacing("100%"),
      height: theme.spacing("auto"),
    },
  },
}));

export const Banner = () => {
  const [produc, setProduc] = useState([]);
  const handleAxios = async () => {
    await axios
      .get("http://89.223.71.112:9898/banners", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setProduc(res.data.data);
      })
      .catch((err) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    handleAxios();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper>
        <DialogAdd onSuccess={handleAxios} />
        <ListItem>
          <ListItemText>Images</ListItemText>
        </ListItem>
        {produc.map((prod) => (
          <List>
            <StyledListItem button>
              <TableItem1>
                <ListItemText button>{prod.title}</ListItemText>
              </TableItem1>

              <TableItem3>
                <ListItemText>
                  <img
                    src={`http://89.223.71.112:9898/image?path=${prod.image}`}
                  />
                </ListItemText>
              </TableItem3>
            </StyledListItem>
            <Divider />
          </List>
        ))}
      </Paper>
    </div>
  );
};

const StyledListItem = styled(ListItem)`
  &&.MuiListItem-root {
    width: 100%;
    display: flex;
    position: relative;
    box-sizing: border-box;
    text-align: left;
    align-items: center;
    padding-top: 8px;
    padding-bottom: 8px;
    justify-content: space-between;
    text-decoration: none;
  }
`;

const TableItem1 = styled.div``;
const TableItem3 = styled.div`
  display: flex;
  justify-content: center;
  width: 80px;
  height: 80px;
  transform: rotate(45deg);
   /* border-top-right-radius: 45%;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 45%;
    overflow: hidden; */
  img {
    transform: rotate(-45deg);
    width: 80px;
    height:80px;
    object-fit: cover;
    border-top-right-radius: 20px; 
    border-top-left-radius: 20px;
   border-bottom-right-radius: 20px;
  }
`;
