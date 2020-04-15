import React, {PureComponent} from "react";

const withForm = (Component) => {
  class WithForm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        formError: false,
        formErrorData: [],
        formFields: {
          email: {
            value: ``,
            validation: {
              required: true,
              email: true
            },
            errorMessage: ``,
            isValid: false
          },
          password: {
            value: ``,
            validation: {
              required: true,
              minLength: 3
            },
            errorMessage: ``,
            isValid: false
          },
          rating: {
            value: ``,
            validation: {
              required: true
            },
            errorMessage: ``,
            isValid: false
          },
          comment: {
            value: ``,
            validation: {
              required: true,
              length: [50, 300]
            },
            errorMessage: ``,
            isValid: false
          },
        },
        isFormValid: false,
        isFormSent: false
      };

      this.handleFieldChange = this.handleFieldChange.bind(this);
      this.validate = this.validate.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
      this.handleShowFormError = this.handleShowFormError.bind(this);
      this.handleFormValidate = this.handleFormValidate.bind(this);
      this.showErrors = this.showErrors.bind(this);
      this.addErrorClass = this.addErrorClass.bind(this);
      this.handleClearFields = this.handleClearFields.bind(this);
    }

    validate(element) {
      let error = [true, null];

      if (element.validation.required) {
        let valid = element.value.trim() !== ``;
        let message = !valid ? `This field is required` : ``;
        error = [valid, message];
      }

      if (element.validation.length) {
        let valid = element.value.length > element.validation.length[0] && element.value.length < element.validation.length[1];
        let message = !valid ?
          `Length must be more than ${element.validation.length[0]} characters and less then ${element.validation.length[1]}`
          :
          ``;
        error = [valid, message];
      }

      if (element.validation.minLength) {
        let valid = element.value.length > element.validation.minLength;
        let message = !valid ? `Length must be more than ` + element.validation.minLength + ` characters` : ``;
        error = [valid, message];
      }

      if (element.validation.maxLength) {
        let valid = element.value.length <= element.validation.maxLength;
        let message = !valid ? `Length must be less than ` + element.validation.maxLength + ` characters` : ``;
        error = [valid, message];
      }

      if (element.validation.email) {
        let valid = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(element.value);
        let message = !valid ? `Invalid email` : ``;
        error = [valid, message];
      }

      return error;
    }

    handleFieldChange(event, fields) {
      const target = event.target;
      const newFormFields = Object.assign({}, this.state.formFields);
      const newField = newFormFields[target.name];
      newField.value = target.value;
      let [valid, message] = this.validate(newField);
      newField.isValid = valid;
      newField.errorMessage = message;
      newFormFields[target.name] = newField;

      this.setState({
        formFields: newFormFields
      }, () => {
        if (fields) {
          this.setState({
            isFormValid: this.handleFormValidate((this.generateFormFields(fields)))
          });
        }
      });
    }

    handleFormValidate(newFormFields) {
      let isValid = true;

      for (let key in newFormFields) {
        if (newFormFields.hasOwnProperty(key)) {
          isValid = newFormFields[key].isValid && isValid;
        }
      }

      return isValid;
    }

    handleShowFormError(newFormFields) {
      let errors = [];
      for (let key in newFormFields) {
        if (newFormFields.hasOwnProperty(key)) {
          let [valid, message] = this.validate(newFormFields[key]);
          if (!valid) {
            errors.push({
              fieldName: key,
              message
            });
          }
        }
      }

      this.setState({
        formError: errors.length > 0,
        formErrorData: errors
      });
    }

    generateFormData(fields) {
      const data = {};

      for (let key in fields) {
        if (fields.hasOwnProperty(key)) {
          data[key] = fields[key].value;
        }
      }

      return data;
    }

    showErrors() {
      const {
        formErrorData
      } = this.state;

      return formErrorData.map((error, index) => {
        return (
          <p key={index}>{error.message}</p>
        );
      });
    }

    addErrorClass(field) {
      const {
        formErrorData
      } = this.state;
      return formErrorData.some((error) => {
        return error.fieldName === field;
      }) ? `field-error` : ``;
    }

    handleClearFields() {
      const newFormFields = Object.assign({}, this.state.formFields);

      for (let field in newFormFields) {
        if (newFormFields.hasOwnProperty(field)) {
          newFormFields[field].value = ``;
          newFormFields[field].isValid = false;
        }
      }

      this.setState({
        formFields: newFormFields,
        isFormValid: false,
        isFormSent: false
      });

    }

    generateFormFields(fieldsToCheck) {
      const newFormFields = Object.assign({}, this.state.formFields);
      let fieldsForForm = {};

      fieldsToCheck.forEach((field) => {
        if (newFormFields[field]) {
          fieldsForForm[field] = newFormFields[field];
        }
      });

      return fieldsForForm;
    }

    handleFormSubmit(event, onSendForm, fieldsToCheck) {
      event.preventDefault();
      const newFormFields = this.generateFormFields(fieldsToCheck);
      const isFormValid = this.handleFormValidate(newFormFields);
      const dataToSend = this.generateFormData(newFormFields);

      if (!isFormValid) {
        this.handleShowFormError(newFormFields);
        return false;
      }

      this.setState({
        isFormSent: true
      }, () => {
        onSendForm(dataToSend, this.handleClearFields);
      });

      return true;
    }

    render() {

      const {
        formError,
        formErrorData,
        isFormValid,
        formFields,
        isFormSent
      } = this.state;

      return (
        <Component
          {...this.props}
          isFormValid={isFormValid}
          isFormSent={isFormSent}
          formError={formError}
          formErrorData={formErrorData}
          showErrors={this.showErrors}
          addErrorClass={this.addErrorClass}
          formFields={formFields}
          onFormSubmit={this.handleFormSubmit}
          onChangeField={this.handleFieldChange}
        />
      );
    }
  }

  return WithForm;
};

export default withForm;
