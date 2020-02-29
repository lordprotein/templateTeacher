import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { FormEditer } from '../../component/FormEditer/FormEditer';
import * as actions from '../../redux/actions';
import FileListContainer from '../formDownloadFile/FileListContainer';
import { v4 as uuidv4 } from 'uuid';


class FormEditerContainer extends Component {
   constructor(props) {
      super(props);

      this.title = this.props.postData ? this.props.postData.title : '';
      this.content = this.props.postData ? this.props.postData.content : '';
   }

   onChangeTitleInput = e => this.title = e.target.value;

   onChangeContentInput = e => this.content = e.target.value;

   handleSend = e => {
      e.preventDefault();

      const { action, toReset, postList, a_updateContent } = this.props;
      const { postData } = this.props;

      if (!this.title && !this.content) return toReset();


      const data = {
         title: this.title,
         content: this.content
      };

      const db = new dbService();

      switch (action) {
         case 'add': {
            const { ID_MENU } = this.props,
               ID = uuidv4(),
               post = { ID, ...data, ID_MENU };

            db.addPost(post)
               .then(() => {
                  const newPostList = [...postList];
                  newPostList.push(post);
                  toReset();
                  a_updateContent(newPostList);
               });
            break;
         }
         case 'edit': {
            const post = { ...postData, ...data };
            db.editPost(post)
               .then(() => {
                  const num = postList.findIndex(elem => elem.ID === postData.ID)

                  let newPostList = [...postList];

                  newPostList[num] = {
                     ...newPostList[num],
                     ...data
                  }

                  a_updateContent(newPostList)
                  toReset();
               })
            break;
         }
         default: break;
      }
   }


   render() {
      const { isActiveDFF, toReset, postData } = this.props;
      const { title, content } = this;

      let ID;
      if (postData) ID = postData.ID;

      const actions = {
         onChangeTitleInput: (e) => this.onChangeTitleInput(e),
         onChangeContentInput: (e) => this.onChangeContentInput(e),
         handleSend: (e) => this.handleSend(e),
      }

      return (
         <FormEditer
            title={title}
            content={content}
            postID={ID}
            actions={actions}
            toReset={toReset}
         >
            {isActiveDFF && <FileListContainer postID={ID} />}
         </FormEditer>
      );
   }
}



const mapStateToProps = state => {
   return {
      postList: selectors.getPostList(state),
      isActiveDFF: selectors.isActiveDFF(state),
   };
}

const mapDispatchToProps = dispatch => {
   const { a_updateContent } = bindActionCreators(actions, dispatch);
   return { a_updateContent };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEditerContainer);


FormEditerContainer.propTypes = {
   postData: PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      ID: PropTypes.string.isRequired,
      ID_MENU: PropTypes.string,
   }),

   action: PropTypes.string.isRequired,

   toReset: PropTypes.func.isRequired,

   ID_MENU: PropTypes.string,
}