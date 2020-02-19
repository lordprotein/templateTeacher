import React, { Component } from 'react';
import PageItemContainer from './PageItemContainer';
import dbService from '../../service/service';
import { Page } from '../../component/content/Page/Page';
import { ButtonWithLogIn } from '../../component/button/Button/Button';
import FormEditerContainer from '../FormEditer/FormEditerContainer';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';


class PageContainer extends Component {
   constructor(props) {
      super(props);
      this.db = new dbService();
      this.state = {
         isEdit: false,
         postList: [],
      }
   }

   componentDidMount = () => {
      const { ID_MENU, a_updateContent } = this.props;
      this.db.getContentList(ID_MENU)
         .then(res => a_updateContent(res));
   }

   setModeAddPost = isToggle => this.setState({ isEdit: isToggle });

   getFormEditer = () => {
      const { ID_MENU } = this.props;
      return (
         <FormEditerContainer
            ID_MENU={ID_MENU}
            action="add"
            toReset={() => this.setModeAddPost(false)}
         />
      );
   }


   getPostList = () => {
      const { postList } = this.props;

      return postList.map((postData) => {
         return (
            <PageItemContainer
               postData={postData}
               key={postData.ID}
            />
         );
      })
   }

   render() {
      const { isEdit } = this.state;

      return (
         <Page>
            {
               isEdit
                  ? this.getFormEditer()
                  : (
                     <>
                        <ButtonWithLogIn
                           title="Добавить пост"
                           onClick={() => this.setModeAddPost(true)}
                        />
                        {this.getPostList()}
                     </>
                  )
            }
         </Page>
      );
   }
}

const mapStateToProps = state => {
   return {
      postList: selectors.getPostList(state),
   }
}

const mapDispatchToProps = dispatch => {
   const { a_updateContent } = bindActionCreators(actions, dispatch);
   return { a_updateContent };
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer);
