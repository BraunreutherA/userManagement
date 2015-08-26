/**
 * Created by braunreu on 19.06.15.
 */
'use strict';
var config = require('./config');

var Promise = require('bluebird');
var valib = require('valib');
var mandrill = require('mandrill-api/mandrill');

/**
 * Mailer via Mandrill.
 * Internally creates new mandrill client for given config.
 *
 * @constructor
 */
function Mailer() {
    this.mandrillClient = new mandrill.Mandrill(config.mailer.apiKey);
}

/**
 * Sends an email with the given parameters via mandrill.
 *
 * @param recipient
 * @param sender
 * @param subject
 * @param templateName
 * @param templateContent
 * @returns {bluebird|exports|module.exports}
 * @private
 */
Mailer.prototype._send = function(recipient, sender, subject, templateName, templateContent) {
    var self = this;

    return new Promise(function (resolve, reject) {
        if (valib.Type.isUndefined(recipient) || !valib.Object.hasKey(recipient, 'name') || !valib.Object.hasKey(recipient, 'email')) {
            return reject(new Error('[Mailer] Sending an Email requires a recipient object with the properties:\n- email\n- name\n'));
        }

        if (valib.Type.isUndefined(sender) || !valib.Object.hasKey(sender, 'name') || !valib.Object.hasKey(sender, 'email')) {
            return reject(new Error('[Mailer] Sending an Email requires a sender object with the properties:\n- email\n- name\n'));
        }

        if (!valib.Type.isString(templateName) || valib.Type.isUndefined(templateContent)) {
            return reject(new Error('[Mailer] Sending an email requires a templateName and templateContent. ' +
                'Please look for them in your mandrill account.'));
        }

        var message = {
            // we don't have extra text or html as we use templates.
            'html': null,
            'text': null,
            'subject': subject,
            'from_email': sender.email,
            'from_name': sender.name,
            'to': [{
                'email': recipient.email,
                'name': recipient.name,
                'type': 'to'
            }],
            'headers': {
                'Reply-To': config.mailer.from.email
            },
            'important': false,
            'track_opens': null,
            'track_clicks': null,
            'auto_text': null,
            'auto_html': null,
            'inline_css': null,
            'url_strip_qs': null,
            'preserve_recipients': null,
            'view_content_link': null,
            'bcc_address': null,
            'tracking_domain': null,
            'signing_domain': null,
            'return_path_domain': null,
            'merge': true,
            'merge_language': 'mailchimp',
            'tags': [
                'contact-information'
            ],
            'subaccount': null,
            'google_analytics_domains': null,
            'google_analytics_campaign': null,
            'metadata': {
                'website': config.mailer.website
            },
            'attachments': null,
            'images': null
        };

        self.mandrillClient.messages.sendTemplate(
            {
                template_name: templateName,
                template_content: templateContent,
                message: message,
                async: false,
                ip_pool: null, //we have no ippool
                send_at: null
            }, // cannot use in free version
            function (result) {
                return resolve(result);
            }, function (error) {
                return reject(error);
            });
    });
};

/**
 * Todo: this is specific to the contact form -> should get into another service for it or into the controller.
 * Sends a confirmation mail back to the user that contacts via the contact form.
 *
 * @param name
 * @param email
 * @param message
 * @returns {bluebird|exports|module.exports}
 */
Mailer.prototype.sendToUser = function (name, email, message) {
    return this._send({email: email, name: name},
        {email: config.mailer.from.email, name: config.mailer.from.name},
        'Du hast eine Nachricht bei Ibalopo hinterlassen.',
        'contactToUser',
        [
            {name: 'userName', content: name},
            {name: 'message', content: message}
        ]
    );
};

/**
 * Todo: this is specific to the contact form -> should get into another service for it or into the controller.
 * Sends a email to the senders target - in this case us.
 *
 * @param name
 * @param email
 * @param message
 * @returns {bluebird|exports|module.exports}
 */
Mailer.prototype.sendToIbalopo = function (name, email, message, subject) {
    return this._send({email: config.mailer.from.email, name: config.mailer.from.name},
        {email: email, name: name},
        name + ' hat uns eine Nachricht auf Ibalopo.de hinterlassen. "' + subject + '"',
        'contactToIbalopo',
        [
            {name: 'userName', content: name},
            {name: 'message', content: message}
        ]
    );
};

module.exports = new Mailer();
