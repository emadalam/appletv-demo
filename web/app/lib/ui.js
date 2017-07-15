/**
 * Generates tvml from the given config and replaces/appends
 * the generated markup in the provided context.
 * 
 * @param  {Object} cfg     The configuration object
 */
function buildAndReplaceInContext(cfg = {}) {
    const doc = cfg.document;
    const template = cfg.template;
    const context = cfg.context;
    const html = cfg.html;
    const domImplementation = doc && doc.implementation;

    if (!domImplementation || !context || (!_.isFunction(template) && !html)) {
        return;
    }

    let lsParser = domImplementation.createLSParser(1, null);
    let lsInput = domImplementation.createLSInput();
    let items = _.isPlainObject(cfg.items) ? cfg.items : {
        items: cfg.items
    };

    lsInput.stringData = _.isString(html) ? html : template(items);
    lsParser.parseWithContext(lsInput, context, cfg.append ? 1 : 2);
}

export { buildAndReplaceInContext };