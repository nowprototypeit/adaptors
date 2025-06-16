const { addFunction } = require('nowprototypeit').views
const { getPluginSpecificConfig } = require('nowprototypeit').config || {getPluginSpecificConfig: () => ({})}

const GOVUKRebrandStyles = !!getPluginSpecificConfig('@nowprototypeit/govuk-frontend-adaptor').GOVUKRebrandStyles


/**
 * This is intended to match the behaviour of the govuk-frontend functionality, which needs to also be compatible
 * with the GOV.UK Prototype Kit.  This is used to set a nunjucks variable which can easily be set from the
 * plugin-specific config (see the "serviceName" config in now-prototype-it-config.js as a clear example of this).
 * In this case we have to match their approach.
 *
 * During the process of building this, it became clear that plugin authors might benefit from the ability to read
 * the config in an officially supported way, so we've added require('nowprototypeit').config.getConfig()
 */

addFunction('govukRebrand', () => GOVUKRebrandStyles)


addFunction(
  'formatItems',
  /**
   * Returns an array of objects for use in a macro that requires a list of items
   *
   * @example
   * ```njk
   * {{ govukCheckboxes({
   *   name: "waste",
   *   fieldset: {
   *     legend: {
   *       text: "Which types of waste do you transport?",
   *       isPageHeading: true,
   *       classes: "govuk-fieldset__legend--l"
   *     }
   *   },
   *   hint: {
   *     text: "Select all that apply."
   *   },
   *   items: ["Rubble", "Oil", "Card"] | formatItems
   * }) }}
   * ```
   * @param  {string[]} items - an array of strings.
   * @returns {{ text: string, value: string }[]} an array of objects with text and value properties.
   */
  (items = []) => Array.isArray(items)
    ? items.map((item) => ({ text: item, value: item }))
    : []
)
