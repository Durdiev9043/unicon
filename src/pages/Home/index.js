import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import "animate.css";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import { Navbar } from "../../components/common/Navbar";
import { DataNav } from "../../components/data/dataNav";
import { Banner } from "../PageFail/Pages_1.jsx";
import { UserPages } from "../PageFail/Pages3.jsx";
import { User } from "../PageFail/userPage.jsx";
import { Link } from "react-router-dom";
import axios from 'axios';
import 'jquery/dist/jquery.min.js';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

const drawerWidth = 280;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  nested: {
    paddingLeft: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 20,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  success: {
    background: '#28a745',
},

}));

const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [card, setCard] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const str = localStorage.getItem("token")
    const parts = str.split('|');
    const substringAfterPipe = parts[1];
    console.log(substringAfterPipe.substring(0, str.length - 1))
    // API-dan ma'lumotlarni olish
    axios.get('http://unic2staffbot.us.uz/api/boss/glavni', {
      headers:{
        Authorization :`Bearer ${substringAfterPipe.replace(/"/g, '')}`
      }
    })
        .then(response => {
          // Olingan ma'lumotlarni state-ga saqlash
          setData(response.data);
          $(document).ready(function () {
            setTimeout(function(){
              $('#example').DataTable({
                "pageLength": 200,
                searching: false,
                lengthChange: false,
                language: {
                  search: "Qidirish:",
                  lengthMenu:    " _MENU_ ",
                  info:           " _START_/_END_  Jami:  _TOTAL_ ",
                  paginate: {
                    first:      "Premier",
                    previous:   "Oldingi",
                    next:       "Keyingi",
                    last:       "<-"
                  },
                }
              });
            } ,1000);
          });
        })
        .catch(error => {
          console.error(error);
        })}, []);
  const handleCardClick = () => {
    setCard(!card);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const [name, setName] = React.useState("");
  console.log(name);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let dataArray = [];

  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      dataArray.push(data[key]);
    }
  }

  console.log(dataArray);
  return (
      <div className="row p-5">
        <div className="shadow-sm p-3">
          <h2 className="text-center">Viloyatlar kesimida qilingan ishlar hisoboti</h2>
          <div className="row">
            <div className="col-6"></div>
            <div className="col-6">
            <form action="/filtr/region/" >
              <div className="input-group text-end">
                <input type="date" className="form-control" name="to_date" placeholder="Start"/>

                <input type="submit" className="form-control" value="yuborish"/>
              </div>
            </form>
            </div>
          </div>
        </div>
        <table className="table shadow-sm table-striped table-bordered mt-4" id="example">
          <thead>
          <tr  className="text-center red" >
            <th rowSpan="2">Viloyat nomi</th>
            <th rowSpan="2">Tumanlar soni</th>
            <th rowSpan="2">Xodimlar soni</th>
            <th colSpan="2">Bir kunlik</th>
            <th rowSpan="2">Kechagi</th>
            <th rowSpan="2">Bugungi</th>
            <th rowSpan="2">Farqi</th>
            <th rowSpan="2">Bir hafta</th>
            {/* Boshqa ustunlar kerak bo'lsa ularga ham shu tarzda qo'shing */}
          </tr>
          <tr  className="text-center">

            <th>Bajarilgan Soni</th>
            <th>Bajarilgan %</th>

          </tr>
          </thead>
          <tbody>
          {/* API-dan olingan ma'lumotlarni jadvalga chiqaring */}
          {dataArray.map(item =>
              parseInt(item.kpi)<30  ? (

            <tr key={item.id}  className="w700 table-danger"   >
                <td ><Link className="font-weight-bold text-decoration-none text-dark" to={"district/"+item.id}>{item.nomi}</Link></td>
                <td className="text-center"> {item.District}</td>
                <td className="text-center">{item.User}</td>
                <td className="text-center">{item.today}</td>
                <td className="text-center">{item.kpi} </td>
                <td className="text-center">{item.yesterday}</td>
                <td className="text-center">{item.today}</td>
              {item.farqi>0 ? (<td className="text-center">{item.farqi}</td>):(<td className="text-center text-danger">{item.farqi}</td>)}
                <td className="text-center">{item.thisweek}</td>

              </tr>
          ):
                  parseInt(item.kpi)>=30 && parseInt(item.kpi)<60 ?
                  (<tr key={item.id}  className="w700  table-warning"   >
                        <td ><Link className="font-weight-bold  text-decoration-none text-dark" to={"district/"+item.id}>{item.nomi}</Link></td>
                        <td className="text-center"> {item.District}</td>
                        <td className="text-center">{item.User}</td>
                        <td className="text-center">{item.today}</td>
                        <td className="text-center">{item.kpi} </td>
                        <td className="text-center">{item.yesterday}</td>
                        <td className="text-center">{item.today}</td>
                        {item.farqi>0 ? (<td className="text-center">{item.farqi}</td>):(<td className="text-center text-danger">{item.farqi}</td>)}
                        <td className="text-center">{item.thisweek}</td>

                  </tr>
                  ) : parseInt(item.kpi)>=60 && parseInt(item.kpi)<100 ?
                          (<tr key={item.id}  className=" table-primary w700"   >
                                <td ><Link className="font-weight-bold text-decoration-none text-dark" to={"district/"+item.id}>{item.nomi}</Link></td>
                                <td className="text-center"> {item.District}</td>
                                <td className="text-center">{item.User}</td>
                                <td className="text-center">{item.today}</td>
                                <td className="text-center">{item.kpi} </td>
                                <td className="text-center">{item.yesterday}</td>
                                <td className="text-center">{item.today}</td>
                                {item.farqi>0 ? (<td className="text-center">{item.farqi}</td>):(<td className="text-center text-danger">{item.farqi}</td>)}
                                <td className="text-center">{item.thisweek}</td>

                              </tr>
                          ) : parseInt(item.kpi) >= 100  ?
                              (<tr key={item.id}  className="w700 success"   >
                                    <td ><Link className="font-weight-bold  text-decoration-none text-dark" to={"district/"+item.id}>{item.nomi}</Link></td>
                                    <td className="text-center"> {item.District}</td>
                                    <td className="text-center">{item.User}</td>
                                    <td className="text-center">{item.today}</td>
                                    <td className="text-center">{item.kpi} </td>
                                    <td className="text-center">{item.yesterday}</td>
                                    <td className="text-center">{item.today}</td>
                                    {item.farqi>0 ? (<td className="text-center">{item.farqi}</td>):(<td className="text-center text-danger">{item.farqi}</td>)}
                                    <td className="text-center">{item.thisweek}</td>

                                  </tr>
                              ) : null

          )}
          </tbody>
        </table>
      </div>
  );
};

export default Home;
