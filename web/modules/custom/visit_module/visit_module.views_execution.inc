<?php

use Drupal\views\ViewExecutable;

/**
 * Implements hook_views_pre_render().
 */
function visit_module_views_pre_render(Drupal\views\ViewExecutable $view) {
  if ($view->id() != "content"){
    $unique_uuids = $new_view_result = [];
    $new_row_index = 0;

    // Loop through results and filter out duplicate results.
    foreach ($view->result as $row) {
      // Use UUID so this works for all entities
      $uuid = $row->_entity->uuid();

      if (!in_array($uuid, $unique_uuids)) {
        $row->index = $new_row_index;
        $new_view_result[] = $row;
        $unique_uuids[] = $uuid;
        $new_row_index++;
      }
    }

    // Replace $view->result with new array. Apparently views requires sequentially keyed
    // array of results instead of skipping keys (e.g. 0, 2, 4, etc), so we can't just
    // unset the duplicates.
    $view->result = $new_view_result;

    // Update the view index to match the new number of rows.
    $view->total_rows = $new_row_index;
  }
}

/**
 * Implements hook_views_post_render().
 */
function visit_module_views_post_render(Drupal\views\ViewExecutable $view) {
  if ($view->id() !== 'VIEW_ID' && $view->getDisplay()->getPluginId() !== 'page') {
    return;
  }
  $request = \Drupal::request();
  if ($route = $request->attributes->get(\Symfony\Cmf\Component\Routing\RouteObjectInterface::ROUTE_OBJECT)) {
    $new_title = $view->getTitle();
    $route->setDefault('_title', $new_title);
  }
}