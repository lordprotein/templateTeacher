import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { FormEditer } from '../../component/FormEditer/FormEditer';
import * as actions from '../../redux/actions';
import FileListContainer from '../formDownloadFile/FileListContainer';


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
            const { ID_MENU } = this.props;

            db.addPost({ ...data, ID_MENU })
               .then(() => {
                  db.updatePostList(ID_MENU, resPostList => {
                     a_updateContent(resPostList);
                     toReset();
                  })
               });
            break;
         }
         case 'edit': {
            db.editPost({ ...postData, ...data })
               .then(() => {
                  const num = postList.findIndex(elem => elem.ID === postData.ID)

                  let newPostList = postList.slice(0);

                  newPostList[num] = {
                     ...newPostList[num],
                     title: this.title,
                     content: this.content
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
      ID: PropTypes.number.isRequired,
      ID_MENU: PropTypes.number,
   }),

   action: PropTypes.string.isRequired,

   toReset: PropTypes.func.isRequired,

   ID_MENU: PropTypes.number,
}