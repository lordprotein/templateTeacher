import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { FormEditer } from '../../component/FormEditer/FormEditer';
import * as actions from '../../redux/actions';


class FormEditerContainer extends Component {
   onChangeTitleInput = e => {
      this.title = e.target.value;
   }

   onChangeContentInput = e => {
      this.content = e.target.value;
   }

   handleSend = e => {
      e.preventDefault();

      const {
         s_loginData, a_removeAllModes, a_updateContent,
         action, postData,
      } = this.props;


      let { title, content } = this;

      if (!title) title = postData.title;
      if (!content) content = postData.content;

      let data = { ...s_loginData, title, content }


      const db = new dbService();

      switch (action) {
         case 'add': {
            const { ID_MENU } = this.props;
            data = { ...data, ID_MENU };

            db.addPost(data)
               .then(() => {
                  db.updatePostList(ID_MENU, (contentList) => {
                     a_updateContent({ ID_MENU, contentList });
                  })
               });
            break;
         }
         case 'edit': {
            const { ID_MENU, ID } = postData;
            data = { ...data, ID };
            db.editPost(data)
               .then(() => {
                  db.updatePostList(ID_MENU, contentList => {
                     a_updateContent({ ID_MENU, contentList });
                  })
               })
            break;
         }
         default: break;
      }

      a_removeAllModes();
   }


   render() {
      const { postData, a_removeAllModes } = this.props;
      let title = '', content = '';

      if (postData !== undefined) {
         title = postData.title;
         content = postData.content;
      }

      const actions = {
         onChangeTitleInput: (e) => this.onChangeTitleInput(e),
         onChangeContentInput: (e) => this.onChangeContentInput(e),
         handleSend: (e) => this.handleSend(e),
      }

      return (
         <FormEditer
            postData={{title, content}}
            actions={actions}
            removeAllModes={a_removeAllModes}
         />
      );
   }
}



const mapStateToProps = state => {
   return ({
      s_loginData: selectors.loginData(state),
      s_statusEdit: selectors.s_toggleAddPost(state),
   });
}

const mapDispatchToProps = dispatch => {
   const { a_updateContent, a_removeAllModes } = bindActionCreators(actions, dispatch);
   return { a_updateContent, a_removeAllModes };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEditerContainer);