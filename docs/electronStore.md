.set(key, value)
Set an item.

The value must be JSON serializable. Trying to set the type undefined, function, or symbol will result in a TypeError.

.set(object)
Set multiple items at once.

.get(key, defaultValue?)
Get an item or defaultValue if the item does not exist.

.reset(...keys)
Reset items to their default values, as defined by the defaults or schema option.

.has(key)
Check if an item exists.

.delete(key)
Delete an item.

.clear()
Delete all items.

.onDidChange(key, callback)
callback: (newValue, oldValue) => {}

Watches the given key, calling callback on any changes.

When a key is first set oldValue will be undefined, and when a key is deleted newValue will be undefined.

Events are only triggered in the same process. So you won't get events in the main process if you trigger an event in a renderer process. See #39.

Returns a function which you can use to unsubscribe:

const unsubscribe = store.onDidChange(key, callback);

unsubscribe();
.onDidAnyChange(callback)
callback: (newValue, oldValue) => {}

Watches the whole config object, calling callback on any changes.

oldValue and newValue will be the config object before and after the change, respectively. You must compare oldValue to newValue to find out what changed.

Returns a function which you can use to unsubscribe:

const unsubscribe = store.onDidAnyChange(key, callback);

unsubscribe();
.size
Get the item count.

.store
Get all the data as an object or replace the current data with an object:

const Store = require('electron-store');

const store = new Store();

store.store = {
hello: 'world'
};
.path
Get the path to the storage file.

.openInEditor()
Open the storage file in the user's editor.
