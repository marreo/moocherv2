exports.toJSON = (docs, propFilter) => {
    let func = function(doc) {
        let json = doc.toJSON();
        if (propFilter != null)
            return _.pick(json, propFilter);
        else
            return json;
    };

    // if (propFilter == null) {
    //     propFilter = this.$settings.modelPropFilter;
    // }

    // if (_.isString(propFilter))
    //     propFilter = propFilter.split(" ");

    // if (_.isArray(docs)) {
    //     return _.map(docs, (doc) => func(doc, propFilter));
    // } else if (_.isObject(docs)) {
    //     return func(docs);
    // }
};