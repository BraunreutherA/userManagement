#User Management

todos & thoughts: 

 - there are some strange errors in the require params middleware! fix it!!
 
 - how to make used passwordreset tokens unuseable after first usage. Or is this necessary? Think so..

 - write readme
 - find a better name :D
 - adjust build tools -> need proper jshint jscs and testing that works correctly with promises.
 - complete error code lib. 
 - throw out odata module -> shouldn't be needed here.
 - docs -> jsdocs, ? 
 - unit test everything! -> needs to be done for actual functions aswell 
 - review / refactor actual framework?
 - how will the end user specify whats the properties of the user? Maybe inject a json sec into it.
 - CI - codeship, travis, ?
 - versioning?
 - database? Mongo sql? - prefer mongo with mongoose
 - no callbacks use promises
 - use jwt as stateless tokens no database flags -> keep the db clean of this shit.
    see as example existing registration method
 - hierachical mvc structure
 
features: 
 - registration (done - need to send the email with the token.)
 - login (done)
 - email verification (token gets verified. so done)
 - password reset (done - somehow used reset tokens need to get revoked. Maybe use a redis instance?)
 - email change ( needs again verifing )
 - user updates
 - role authorization 
 - maybe admin backend?
 - transaction email with templates - smtp, maybe give choice to use sth like mandrill api?
 - facebook, google+, twitter login
 - user model adjustable
 
