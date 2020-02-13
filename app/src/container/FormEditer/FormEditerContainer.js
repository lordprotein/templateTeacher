import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { FormEditer } from '../../component/FormEditer/FormEditer';
import * as actions from '../../redux/actions';


class FormEditerContainer extends Component {
   onChangeTitleInput = e => this.title = e.target.value;

   onChangeContentInput = e => this.content = e.target.value;

   handleSend = e => {
      e.preventDefault();

      const { loginData, action, toReset } = this.props;
      let { postData } = this.props;

      if (!this.title && !this.content) return toReset();


      if (this.title) postData.title = this.title;
      if (this.content) postData.content = this.content;


      const data = { ...loginData, ...postData };

      const db = new dbService();

      switch (action) {
         case 'add': {
            const { ID_MENU } = this.props;
            // data = { ...data, ID_MENU };

            // db.addPost(data)
            // .then(() => {
            // db.updatePostList(ID_MENU, (contentList) => {
            //    a_updateContent({ ID_MENU, contentList });
            //    toReset();
            // })
            // });
            break;
         }
         case 'edit': {
            db.editPost(data)
               .then(() => toReset())
            break;
         }
         default: break;
      }
   }


   render() {
      const { postData, toReset } = this.props;
      let title = '', content = '';

      if (postData !== undefined) {
         title = postData.title;
         content = postData.content;
      }

      return (
         <FormEditer
            postData={{ title, content }}
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
   return { loginData: selectors.loginData(state) };
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
   }).isRequired,

   action: PropTypes.string.isRequired,
   
   toReset: PropTypes.func.isRequired,
}