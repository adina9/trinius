import { NavLink, withRouter } from 'react-router-dom'
//icons:
import HouseOutlinedIcon from '@material-ui/icons/HouseOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined';
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

function _AppNav() {

    return (
        <nav>
            <ul className="flex j-evenly clean-list">
                <li><NavLink to="/home"  activeClassName="active-link"><HouseOutlinedIcon /></NavLink></li>
                <li><NavLink to="/adding" activeClassName="active-link"><QuestionAnswerOutlinedIcon /></NavLink></li>
                <li><NavLink to="/dashboard" activeClassName="active-link"><TrendingUpIcon /></NavLink></li>
                <li><NavLink to="/settings" activeClassName="active-link"><SettingsOutlinedIcon /></NavLink></li>
                <li><NavLink to="/about" activeClassName="active-link"><NotListedLocationIcon /></NavLink></li>
            </ul>
        </nav>
    )
}
export const AppNav = withRouter(_AppNav)


