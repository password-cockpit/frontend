/** 
* @see https://github.com/passwordcockpit/frontend for the canonical source repository 
* @copyright Copyright (c) 2018 Blackpoints AG (https://www.blackpoints.ch) 
* @license https://github.com/passwordcockpit/frontend/blob/master/LICENSE.md BSD 3-Clause License 
*/

import Service from '@ember/service';

/* global sjcl */
export default Service.extend({
    init() {
        this._super(...arguments);

        this.parameters = this.parameters || { 'mode': 'gcm' };
    },
    encryptPassword(pin, password) {
        try {
            return sjcl.encrypt(pin, password, this.get('parameters'));
        }
        catch (err) {
            return false
        }

    },
    decryptPassword(pin, password) {
        try {
            return sjcl.decrypt(pin, password);
        }
        catch (err) {
            return false
        }

    }
});
