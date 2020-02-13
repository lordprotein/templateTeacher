import React, { Component } from 'react';
import PageItemContainer from './PageItemContainer';
import dbService from '../../service/service';
import { Page } from '../../component/content/Page/Page';
import { ButtonWithLogIn } from '../../component/button/Button/Button';


export default class PageContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
        this.state = {
            isEdit: false,
            postList: [],
        }
    }

    componentDidMount = () => {
        const { ID_MENU } = this.props;
        this.db.getContentList(ID_MENU)
            .then(res => {
                this.setState(() => {
                    return { postList: res }
                });
            })
    }

    setModeAddPost = isToggle => this.setState({ isEdit: isToggle });

    // getFormEditer = (ID_MENU) => {
    //     return (
    //         <FormEditerContainer
    //             ID_MENU={ID_MENU}
    //             action="add"
    //             toReset={() => this.setModeAddPost(false)}
    //         />
    //     );
    // }

    toDeletePost = ID => {
        this.setState(({ postList }) => {
            const newList = postList.filter(elem => elem.ID !== ID);
            return { postList: newList };
        });

    }

    getPostList = () => {
        const { postList } = this.state;
        console.log(postList)
        return postList.map((postData) => {
            return (
                <PageItemContainer
                    postData={postData}
                    toDeletePost={() => this.toDeletePost(postData.ID)}
                    key={postData.ID}
                />
            );
        })
    }

    render() {
        return (
            <Page>
                {
                    <ButtonWithLogIn
                        title="Добавить пост"
                        onClick={this.setModeAddPost}
                    />
                }
                {this.getPostList()}
            </Page>
        );
    }
}