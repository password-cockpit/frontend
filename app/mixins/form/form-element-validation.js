/** 
* @see https://github.com/passwordcockpit/frontend for the canonical source repository 
* @copyright Copyright (c) 2018 Blackpoints AG (https://www.blackpoints.ch) 
* @license https://github.com/passwordcockpit/frontend/blob/master/LICENSE.md BSD 3-Clause License 
*/

import Mixin from "@ember/object/mixin";
import { inject } from "@ember/service";

/**
 * This Mixin manage the elements form validation
 */
export default Mixin.create({
    intl: inject("intl"),
    isElementValid: null,
    errorMessage: null,
    showElementMessage: false,
    tagName: '',
    willDestroyElement() {
        // Remove element from Errors list
        let isFormValid = this.get('isFormValid').filter(element => {
            return element.name != this.get("name")
        });
        this.set('isFormValid', isFormValid);
    },
    init() {
        this._super(...arguments);
        // populate object for form validation on submit
        if (this.get("isFormValid").filterBy(
            "name",
            this.get("name")
        ).length === 0) {
            this.get("isFormValid").pushObject({
                name: this.get("name"),
                isElementValid: this.get("isElementValid"),
                element: this
            });
        }
        // validate element on load
        this.validation(false);
    },
    /**
     * min length validation
     *
     * @param {integer} length
     */
    checkMinLength: function (length) {
        if (this.get("value") && this.get("value").length < length) {
            return false;
        }
        return true;
    },
    /**
     * max length validation
     *
     * @param {integer} length
     */
    checkMaxLength: function (length) {
        if (this.get("value") && this.get("value").length > length) {
            return false;
        }
        return true;
    },
    /**
     * type validation
     *
     */
    checkType: function () {
        let regex = '';
        if (this.get('validator.type') === 'select') {
            return true;
        }
        if (this.get('validator.type') === 'email') {
            regex = /^$|(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
        if (this.get('validator.type') === 'url') {
            regex = /^((http|ftp)s?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})$/
        }
        if (this.get('validator.type') === 'password') {
            regex = /^$|\S*(?=\S*[\W])(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/
        }
        if (this.get('validator.type') === 'phone') {
            regex = /^$|[\d-]+$/
        }
        return regex.test(this.get('value'));
    },

    /**
     * validation
     *
     * @param {boolean} showEMessage
     */
    validation: function (showElementMessage) {
        let isElementValid = true;
        // required
        if (this.get('validator.required') && !this.get('value')) {
            this.set("errorMessage", this.get("intl").t("This is a required field"));
            isElementValid = false;
        } else if (this.get('validator.minLength') && !this.checkMinLength(this.get("validator.minLength"))) {
            // min length
            this.set("errorMessage", this.get("intl").t("Minimum length: ") + this.get("validator.minLength"));
            isElementValid = false;
        } else if (this.get('validator.maxLength') && !this.checkMaxLength(this.get("validator.maxLength"))) {
            // max length
            this.set("errorMessage", this.get("intl").t("Maximum length: ") + this.get("validator.maxLength"));
            isElementValid = false;
        } else if (this.get('validator.type') && this.get('value') && !this.checkType()) {
            // type (email, url, ...)
            this.set("errorMessage", this.get("intl").t("Field type: " + this.get("validator.type")));
            isElementValid = false;
        } else if (this.get('validator.equalTo') && this.get('value') !== this.get('validator.equalTo')) {
            // type (email, url, ...)
            this.set("errorMessage", this.get("intl").t("Value mismatch"));
            isElementValid = false;
        }


        // show / hide message
        this.set("showElementMessage", showElementMessage);
        this.set("isElementValid", isElementValid);
        // update object for form validation on submit
        this.get("isFormValid").filterBy(
            "name",
            this.get("name")
        )[0].isElementValid = isElementValid;

        return isElementValid;
    },
    actions: {
        keyUp() {
            this.validation(true);
            if (this.keyUpCustomAction !== undefined) {
                this.keyUpCustomAction()
            }
        }
    }
});
