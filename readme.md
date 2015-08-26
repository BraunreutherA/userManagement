#User Management

todos & thoughts: 
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
 - registration
 - login 
 - email verification
 - password reset 
 - email change ( needs again verifing )
 - user updates
 - role authorization 
 - maybe admin backend?
 - transaction email with templates - smtp, maybe give choice to use sth like mandrill api?
 - facebook, google+, twitter login
 - user model adjustable
 
