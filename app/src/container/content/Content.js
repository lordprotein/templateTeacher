import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer'
import ContentItem from '../../component/contentItem/ContentItem';



class Content extends Component {

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
        const { menuList } = this.props;

        if (!menuList.length) return false;

        return menuList.map(({ link, postList }, key) => {
            return (
                <Route
                    path={link}
                    render={() => this.generatePosts(postList)}
                    key={key}
                />
            );
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

const mapStateToProps = state => {
    return { menuList: selectors.menuList(state) }
}

export default connect(mapStateToProps)(Content);