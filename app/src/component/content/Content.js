import React, { Component } from 'react';
import ContentItem from '../contentItem/ContentItem';
import { Switch, Route } from 'react-router-dom';
import dbService from '../../dbService/dbService';
import toNormalizeLink from '../normalizeLink/normalizeLink';



export default class Content extends Component {
    state = {
        menus: []
    }

    componentDidMount = async () => {
        const db = new dbService();

        const menuList = await db.getMenuList();

        const menus = menuList.map(async ({ ID, title }) => {
            const postList = await db.getContentList(ID)
            return {
                title: title,
                link: `/${toNormalizeLink(title)}`,
                posts: postList
            }
        })

        const resMenu = await Promise.all(menus);
        // console.log(resMenu)
        this.setState(() => {
            return { menus: resMenu }
        })
    }

    generatePosts = (menuItem = []) => {
        return menuItem.map(({ title, content }, key) => {
            return (
                <ContentItem
                    title={title}
                    content={content}
                    key={key}
                />
            )
        })
    }

    get createRoute() {
        const { menus } = this.state;

        if (!menus.length) return false;

        return menus.map(({ link, posts }, key) => {

            return <Route
                path={link}
                render={() => this.generatePosts(posts)}
                key={key} />
        });
    }

    render() {
        return (
            <section className="content">
                <Switch>
                    <Route exact path='/' render={() => <Te />} />
                    {this.createRoute}
                </Switch>
            </section>
        );
    }
}

const Te = () => {
    return <div>Hello!</div>;
}
