import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { FormEditer } from '../../component/FormEditer/FormEditer';
import * as actions from '../../redux/actions';


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

      const { loginData, action, toReset, postList, a_updateContent } = this.props;
      const { postData } = this.props;

      if (!this.title && !this.content) return toReset();


      const data = {
         ...loginData,
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
      const { toReset } = this.props;
      const { title, content } = this;

      return (
         <FormEditer
            title={title}
            content={content}
            actions={
               {
                  onChangeTitleInput: (e) => this.onChangeTitleInput(e),
                  onChangeContentInput: (e) => this.onChangeContentInput(e),
                  handleSend: (e) => this.handleSend(e),
               }
            }
            toReset={toReset}
         />
      );
   }
}



const mapStateToProps = state => {
   return {
      loginData: selectors.loginData(state),
      postList: selectors.getPostList(state),

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