/**
 * UiSelector 模块 - 封装 RichAuto 的 UI 选择器方法
 */

module.exports = {
    /**
     * 注册 uiselector 模块的所有 handlers
     * @param {Object} jsBridge - WebView 的 jsBridge 对象
     */
    register: function(jsBridge) {
        // ==================== 基础选择器 ====================
        
        // 创建空选择器
        jsBridge.handle('uiselector.selector', function(event) {
            return selector();
        });
        
        // ==================== ID 选择器系列 ====================
        
        jsBridge.handle('uiselector.id', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return id.apply(null, args);
        });
        
        jsBridge.handle('uiselector.idStartsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return idStartsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.idEndsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return idEndsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.idContains', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return idContains.apply(null, args);
        });
        
        jsBridge.handle('uiselector.idMatches', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return idMatches.apply(null, args);
        });
        
        jsBridge.handle('uiselector.idMatch', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return idMatch.apply(null, args);
        });
        
        jsBridge.handle('uiselector.idHex', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return idHex.apply(null, args);
        });
        
        // ==================== Text 选择器系列 ====================
        
        jsBridge.handle('uiselector.text', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return text.apply(null, args);
        });
        
        jsBridge.handle('uiselector.textStartsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return textStartsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.textEndsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return textEndsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.textContains', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return textContains.apply(null, args);
        });
        
        jsBridge.handle('uiselector.textMatches', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return textMatches.apply(null, args);
        });
        
        jsBridge.handle('uiselector.textMatch', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return textMatch.apply(null, args);
        });
        
        // ==================== Desc 选择器系列 ====================
        
        jsBridge.handle('uiselector.desc', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return desc.apply(null, args);
        });
        
        jsBridge.handle('uiselector.descStartsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return descStartsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.descEndsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return descEndsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.descContains', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return descContains.apply(null, args);
        });
        
        jsBridge.handle('uiselector.descMatches', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return descMatches.apply(null, args);
        });
        
        jsBridge.handle('uiselector.descMatch', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return descMatch.apply(null, args);
        });
        
        // ==================== ClassName 选择器系列 ====================
        
        jsBridge.handle('uiselector.className', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return className.apply(null, args);
        });
        
        jsBridge.handle('uiselector.classNameStartsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return classNameStartsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.classNameEndsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return classNameEndsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.classNameContains', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return classNameContains.apply(null, args);
        });
        
        jsBridge.handle('uiselector.classNameMatches', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return classNameMatches.apply(null, args);
        });
        
        jsBridge.handle('uiselector.classNameMatch', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return classNameMatch.apply(null, args);
        });
        
        // ==================== PackageName 选择器系列 ====================
        
        jsBridge.handle('uiselector.packageName', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return packageName.apply(null, args);
        });
        
        jsBridge.handle('uiselector.packageNameStartsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return packageNameStartsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.packageNameEndsWith', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return packageNameEndsWith.apply(null, args);
        });
        
        jsBridge.handle('uiselector.packageNameContains', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return packageNameContains.apply(null, args);
        });
        
        jsBridge.handle('uiselector.packageNameMatches', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return packageNameMatches.apply(null, args);
        });
        
        jsBridge.handle('uiselector.packageNameMatch', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return packageNameMatch.apply(null, args);
        });
        
        // ==================== 布尔属性选择器 ====================
        
        jsBridge.handle('uiselector.clickable', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return clickable.apply(null, args);
        });
        
        jsBridge.handle('uiselector.longClickable', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return longClickable.apply(null, args);
        });
        
        jsBridge.handle('uiselector.checkable', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return checkable.apply(null, args);
        });
        
        jsBridge.handle('uiselector.checked', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return checked.apply(null, args);
        });
        
        jsBridge.handle('uiselector.focusable', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return focusable.apply(null, args);
        });
        
        jsBridge.handle('uiselector.focused', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return focused.apply(null, args);
        });
        
        jsBridge.handle('uiselector.scrollable', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return scrollable.apply(null, args);
        });
        
        jsBridge.handle('uiselector.selected', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return selected.apply(null, args);
        });
        
        jsBridge.handle('uiselector.enabled', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return enabled.apply(null, args);
        });
        
        jsBridge.handle('uiselector.editable', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return editable.apply(null, args);
        });
        
        jsBridge.handle('uiselector.multiLine', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return multiLine.apply(null, args);
        });
        
        // ==================== 深度/索引选择器 ====================
        
        jsBridge.handle('uiselector.depth', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return depth.apply(null, args);
        });
        
        jsBridge.handle('uiselector.minDepth', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return minDepth.apply(null, args);
        });
        
        jsBridge.handle('uiselector.maxDepth', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return maxDepth.apply(null, args);
        });
        
        jsBridge.handle('uiselector.row', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return row.apply(null, args);
        });
        
        jsBridge.handle('uiselector.rowCount', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return rowCount.apply(null, args);
        });
        
        jsBridge.handle('uiselector.column', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return column.apply(null, args);
        });
        
        jsBridge.handle('uiselector.columnCount', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return columnCount.apply(null, args);
        });
        
        jsBridge.handle('uiselector.drawingOrder', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return drawingOrder.apply(null, args);
        });
        
        // ==================== 边界相关选择器 ====================
        
        jsBridge.handle('uiselector.bounds', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return bounds.apply(null, args);
        });
        
        jsBridge.handle('uiselector.boundsInside', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return boundsInside.apply(null, args);
        });
        
        jsBridge.handle('uiselector.boundsContains', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return boundsContains.apply(null, args);
        });
        
        // ==================== 查找方法 ====================
        
        jsBridge.handle('uiselector.findOnce', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            // 需要先获取选择器对象
            var selectorArgs = args[0]; // 选择器参数
            var sel = buildSelector(selectorArgs);
            return sel.findOnce.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.find', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.find.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.findOne', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.findOne.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.untilFindOne', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.untilFindOne.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.untilFind', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.untilFind.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.waitFor', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.waitFor.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.exists', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.exists.apply(sel, args.slice(1));
        });
        
        // ==================== 行为方法 ====================
        
        jsBridge.handle('uiselector.click', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.click.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.longClick', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.longClick.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.setText', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.setText.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.scrollForward', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.scrollForward.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.scrollBackward', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.scrollBackward.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.focus', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.focus.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.clearFocus', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.clearFocus.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.paste', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.paste.apply(sel, args.slice(1));
        });
        
        jsBridge.handle('uiselector.setSelection', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            var selectorArgs = args[0];
            var sel = buildSelector(selectorArgs);
            return sel.setSelection.apply(sel, args.slice(1));
        });
        
        // ==================== 工具方法 ====================
        
        jsBridge.handle('uiselector.pickup', function(event) {
            var args = Array.prototype.slice.call(arguments, 1);
            return pickup.apply(null, args);
        });
    }
};

/**
 * 辅助函数：根据参数构建选择器
 * @param {Object} args - 选择器参数对象
 * @returns {UiSelector}
 */
function buildSelector(args) {
    var sel = selector();
    
    if (!args || typeof args !== 'object') {
        return sel;
    }
    
    // 遍历参数对象，调用相应的选择器方法
    for (var key in args) {
        if (args.hasOwnProperty(key)) {
            var value = args[key];
            
            // 如果选择器方法存在，则调用
            if (typeof sel[key] === 'function') {
                if (Array.isArray(value)) {
                    sel = sel[key].apply(sel, value);
                } else {
                    sel = sel[key](value);
                }
            }
        }
    }
    
    return sel;
}

