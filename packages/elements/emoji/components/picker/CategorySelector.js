import * as tslib_1 from "tslib";
import * as classNames from 'classnames';
import * as React from 'react';
import { PureComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import { defaultCategories } from '../../constants';
import { messages } from '../i18n';
import { CategoryDescriptionMap, } from './categories';
import * as styles from './styles';
export var sortCategories = function (c1, c2) {
    return CategoryDescriptionMap[c1].order - CategoryDescriptionMap[c2].order;
};
var addNewCategories = function (oldCategories, newCategories) {
    if (!newCategories) {
        return oldCategories;
    }
    return oldCategories
        .concat(newCategories.filter(function (category) { return !!CategoryDescriptionMap[category]; }))
        .sort(sortCategories);
};
var CategorySelector = /** @class */ (function (_super) {
    tslib_1.__extends(CategorySelector, _super);
    function CategorySelector(props) {
        var _this = _super.call(this, props) || this;
        _this.onClick = function (categoryId) {
            var onCategorySelected = _this.props.onCategorySelected;
            if (onCategorySelected) {
                onCategorySelected(categoryId);
            }
        };
        var dynamicCategories = props.dynamicCategories;
        var categories = defaultCategories;
        if (dynamicCategories) {
            categories = addNewCategories(categories, dynamicCategories);
        }
        _this.state = {
            categories: categories,
        };
        return _this;
    }
    CategorySelector.prototype.componentWillUpdate = function (nextProps) {
        if (this.props.dynamicCategories !== nextProps.dynamicCategories) {
            this.setState({
                categories: addNewCategories(defaultCategories, nextProps.dynamicCategories),
            });
        }
    };
    CategorySelector.prototype.render = function () {
        var _this = this;
        var disableCategories = this.props.disableCategories;
        var categories = this.state.categories;
        var categoriesSection;
        if (categories) {
            categoriesSection = (React.createElement("ul", null, categories.map(function (categoryId) {
                var category = CategoryDescriptionMap[categoryId];
                var categoryClasses = [styles.category];
                if (categoryId === _this.props.activeCategoryId) {
                    categoryClasses.push(styles.active);
                }
                var onClick = function (e) {
                    e.preventDefault();
                    // ignore if disabled
                    if (!disableCategories) {
                        _this.onClick(categoryId);
                    }
                };
                if (disableCategories) {
                    categoryClasses.push(styles.disable);
                }
                // tslint:disable-next-line:variable-name
                var Icon = category.icon;
                return (React.createElement("li", { key: category.id },
                    React.createElement(FormattedMessage, tslib_1.__assign({}, messages[category.name]), function (categoryName) { return (React.createElement("button", { "data-category-id": category.id, className: classNames(categoryClasses), onClick: onClick, title: categoryName },
                        React.createElement(Icon, { label: categoryName }))); })));
            })));
        }
        return (React.createElement("div", { className: classNames([styles.categorySelector]) }, categoriesSection));
    };
    CategorySelector.defaultProps = {
        onCategorySelected: function () { },
        dynamicCategories: [],
    };
    return CategorySelector;
}(PureComponent));
export default CategorySelector;
//# sourceMappingURL=CategorySelector.js.map