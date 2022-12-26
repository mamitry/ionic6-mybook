import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onActivated,
  onDeactivated,
} from "vue";
import { DebugLevel, appLog } from "./Logging";
// import { onBeforeRouteUpdate, onBeforeRouteLeave } from "vue-router";

export function hooks(compName) {
  // other hooks:
  // onRenderTracked,
  // onRenderTriggered,
  // onScopeDispose,
  // onServerPrefetch,

  /**
   * called, when the component has finished setting up its reactive state,
   * but no DOM nodes have been created yet.
   * It is about to execute its DOM render effect for the first time.
   */
  onBeforeMount(() => {
    appLog(DebugLevel.HOOKS, compName, "Before Mount");
  });

  /**
   * Called after the component has been mounted.
   * A component is considered mounted after:
   * - all of its synchronous child components have been mounted (async components or components inside <Suspense> trees NOT include).
   * - its own DOM tree has been created and inserted into the parent container.
   * - Note it only guarantees that the component's DOM tree is in-document if the application's root container is also in-document.
   * - This hook is typically used for performing side effects that need access to the component's rendered DOM
   */
  onMounted(() => {
    appLog(DebugLevel.HOOKS, compName, "Mounted");
  });
  /**
   * Called right before the component is about to update its DOM tree due to a reactive state change.
   * This hook can be used to access the DOM state before Vue updates the DOM.
   * It is also safe to modify component state inside this hook.
   */
  onBeforeUpdate(() => {
    appLog(DebugLevel.HOOKS, compName, "Before Update");
  });
  /**
   * Called after the component has updated its DOM tree due to a reactive state change.
   *
   * A parent component's updated hook is called after that of its child components.
   * This hook is called after any DOM update of the component, which can be caused by different state changes.
   * If you need to access the updated DOM after a specific state change, use nextTick() instead.
   * WARNING: Do not mutate component state in the updated hook - this will likely lead to an infinite update loop!
   */
  onUpdated(() => {
    appLog(DebugLevel.HOOKS, compName, "Updated");
  });
  /**
   * Called right before a component instance is to be unmounted.
   *
   * when this hook is called, the component instance is still fully functional.
   */
  onBeforeUnmount(() => {
    appLog(DebugLevel.HOOKS, compName, "Before Unmount");
  });
  /**
   * Called after the component has been unmounted.
   * A component is considered unmounted after:
   * - all of its child components have been unmounted.
   * - all of its associated reactive effects (render effect and computed / watchers created during setup()) have been stopped.
   *
   * use to clean up manually created side effects such as timers, DOM event listeners or server connections.
   */
  onUnmounted(() => {
    appLog(DebugLevel.HOOKS, compName, "Unmounted");
  });
  /**
   * Called after the component instance is inserted into the DOM as part of a tree cached by <KeepAlive>.
   */
  onActivated(() => {
    appLog(DebugLevel.HOOKS, compName, "Activated");
  });
  /**
   *   Called after the component instance is removed from the DOM as part of a tree cached by <KeepAlive>.
   */
  onDeactivated(() => {
    appLog(DebugLevel.HOOKS, compName, "Deactivated");
  });
  /**
   * Called when an error propagating from a descendant component has been captured.
   */
  onErrorCaptured(() => {
    appLog(DebugLevel.HOOKS, compName, "Error Captured");
  });

  // onBeforeRouteUpdate(() => {
  //   appLog(DebugLevel.HOOKS, compName, "Router Before Route Update");
  // });

  // onBeforeRouteLeave(() => {
  //   appLog(DebugLevel.HOOKS, compName, "Router Before Route Leave");
  // });
}
