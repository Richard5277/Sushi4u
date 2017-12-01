//
//

import { Link } from 'react-router-dom';
import React from 'react'
import HomeIcon from 'react-icons/lib/fa/home'
import AddDayIcon from 'react-icons/lib/fa/calendar-plus-o'
import ListDaysIcon from 'react-icons/lib/fa/table'

export const Menu = () => 
	<nav className="menu">
		<Link to="/" activeclassname="selected">
			<HomeIcon />
		</Link>
		<Link to="/currentorder" activeclassname="selected">
			<ListDaysIcon />
		</Link>
		<Link to="/addsushi" activeclassname="selected">
			<AddDayIcon />
		</Link>
	</nav>