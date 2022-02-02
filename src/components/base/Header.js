import React from 'react';
import './Header.css';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchIcon from '@material-ui/icons/Search';
import BeenhereIcon from '@material-ui/icons/Beenhere';
import CreateIcon from '@material-ui/icons/Create';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import {Avatar} from "@material-ui/core";

function Header() {
    return (
        <div className="header">
            <div className='headerLeft'>
                <div className='headerLeft__object'>
                    <h1>IF-TALK</h1>
                    <ArrowDropDownIcon />
                </div>
                <div className='headerLeft__object'>
                    <div className='header__community'>
                        <p>コミュニティ</p>
                        <ArrowDropDownIcon />
                    </div>
                </div>
                <div className='headerLeft__object'>
                    <div className='search__form'>
                        <SearchIcon />
                        <input
                            className="headerLeft__input"
                            placeholder="キーワードを入力"

                        />
                    </div>
                    <div className="search__form__media">
                        <SearchIcon />
                    </div>
                </div>
            </div>
            <div className='headerRight'>
                <div className='headerRight__object'>
                    <BeenhereIcon />
                    <p className="headerRight__p">ストック一覧</p>
                </div>
                <div className='headerRight__object'>
                    <div className='headerRight__publish'>
                        <CreateIcon />
                        <p>投稿する</p>
                        <ArrowDropDownIcon />
                    </div>
                </div>
                <div className='headerRight__object'>
                    <div className='headerRight__notification'>
                        <NotificationsNoneIcon />
                        <p>0</p>
                    </div>
                </div>
                <div className='headerRight__object'>
                    <div className='headerRight__avatar'>
                        <Avatar />
                        <ArrowDropDownIcon />
                    </div>
                </div>


                {/* Media   */}
                <div className='headerRight__object__media'>
                    <BeenhereIcon />
                </div>
                <div className='headerRight__object__media'>
                    <div className='headerRight__notification'>
                        <NotificationsNoneIcon />
                        <p>0</p>
                    </div>
                </div>
                <div className='headerRight__object__media'>
                    <div className='headerRight__avatar'>
                        <Avatar />
                        <ArrowDropDownIcon />
                    </div>
                </div>


            </div>

            <div className='headerRight'>

                 ...

            </div>
        </div>
      )
 }

 export default Header

