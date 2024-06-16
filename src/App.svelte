<script>
  import "./app.css";
  import { Router, Link, Route } from "svelte-routing";
  import HomeIcon from "./assets/HomeIcon.svg?component";
  import HistoryIcon from "./assets/History.svg?component";
  import FoodsIcon from "./assets/FoodsIcon.svg?component";
  import AddCircleIcon from "./assets/AddCircleIcon.svg?component";
  import SettingsIcon from "./assets/SettingsIcon.svg?component";

  import * as routes from "./routes";

  import * as DropdownMenu from "$components/ui/dropdown-menu";
  import { Button } from "$components/ui/button";

  import {
    BottomNavigation,
    NavigationName as NavName,
  } from "./components/BottomNavigation";

  export let url = "";
</script>

<Router {url} basepath="/food_control">
  <div class="max-w-lg mx-auto">
    <Route path="/" component={routes.MainView} />
    <Route path="/history" component={routes.History} />
    <Route path="/foods" component={routes.FoodsList} />
    <Route path="/settings" component={routes.Settings} />
    <Route path="/add_record" component={routes.AddNewFoodRecording} />
    <Route path="/add_food" component={routes.AddFood} />
  </div>
  <BottomNavigation>
    <Link
      to="/"
      type="button"
      class="peer inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <HomeIcon
        height="28px"
        width="28px"
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
      />
      <NavName>Главная</NavName>
    </Link>
    <Link
      to="/foods"
      type="button"
      class="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <FoodsIcon
        height="28px"
        width="28px"
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
      />
      <NavName>Продукты</NavName>
    </Link>
    <Link
      to="/history"
      type="button"
      class="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <HistoryIcon
        height="28px"
        width="28px"
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
      />
      <NavName>История</NavName>
    </Link>
    <Link
      to="/settings"
      type="button"
      class="inline-flex flex-col items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 group"
    >
      <SettingsIcon
        height="28px"
        width="28px"
        aria-hidden="true"
        class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
      />
      <NavName>Настройки</NavName>
    </Link>
  </BottomNavigation>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <div class="fixed bottom-16 right-0 p-5">
        <Button
          builders={[builder]}
          variant="outline"
          class="rounded-full size-16"
        >
          <AddCircleIcon
            height="36px"
            width="36px"
            class="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
          />
        </Button>
      </div>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content side="top">
      <DropdownMenu.Group>
        <Link to="/add_food">
          <DropdownMenu.Item class="p-4">Добавить продукт</DropdownMenu.Item>
        </Link>
        <DropdownMenu.Separator />
        <Link to="/add_record">
          <DropdownMenu.Item class="p-4">Добавить запись</DropdownMenu.Item>
        </Link>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</Router>

<style>
  :global([aria-current="page"] > *) {
    @apply text-blue-600;
  }
</style>
