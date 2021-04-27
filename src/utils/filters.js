const taskToFilterMap = {
  all: (tasks) => tasks.length,
  favorites: (tasks) => tasks
    .filter((task) => task.film_info.isFavorite)
    .filter((task) => task.film_info.isFavorite).length,
  history: (tasks) => tasks
    .filter((task) => task.film_info.isArchived)
    .filter((task) => task.film_info.isArchived).length,
  watch: (tasks)  => tasks
    .filter((task) => task.film_info.isWatched)
    .filter((task) => task.film_info.isWatched).length,
};

export const generateFilter = (films) => {
  return Object.entries(taskToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(films),
    };
  });
};
