<template>
  <div class="saas-nav">
    <template v-for="firstRoute in routesData" :key="firstRoute.path">
      <template v-for="item in firstRoute.children?.filter(Boolean)" :key="item.path">
        <div v-if="item && !item.hidde">
          <!-- Group with children -->
          <div v-if="item.asideVisible === true && checkRole(item.meta?.anchors)" class="nav-group">
            <div class="nav-group-title" v-show="!isCollapsed">
              {{ item.meta?.title }}
            </div>
            <template v-for="routeChild in item.children" :key="routeChild.path">
              <template v-if="!routeChild.hidde && checkRole(routeChild.meta?.anchors)">
                <!-- Direct menu item -->
                <div v-if="!routeChild.children || routeChild.children.length === 0">
                  <div
                    class="nav-item"
                    :class="{ 'is-active': isActive(routeChild.path) }"
                    @click="navigate(routeChild.path)"
                  >
                    <div class="nav-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      </svg>
                    </div>
                    <span class="nav-item-label" v-show="!isCollapsed">{{ routeChild.meta?.title }}</span>
                  </div>
                </div>
                <!-- Nested sub-menu -->
                <div v-else>
                  <div
                    class="nav-item"
                    :class="{ 'is-expanded': expandedMenus.has(routeChild.path) }"
                    @click="toggleExpand(routeChild.path)"
                  >
                    <div class="nav-item-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      </svg>
                    </div>
                    <span class="nav-item-label" v-show="!isCollapsed">{{ routeChild.meta?.title }}</span>
                    <svg v-show="!isCollapsed" class="nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                  <div class="nav-children" v-show="!isCollapsed && expandedMenus.has(routeChild.path)">
                    <div
                      v-for="routeRject in routeChild.children"
                      :key="routeRject.path"
                      v-show="!routeRject.hidde && checkRole(routeRject.meta?.anchors)"
                      class="nav-child-item"
                      :class="{ 'is-active': isActive(routeRject.path) }"
                      @click="navigate(routeRject.path)"
                    >
                      <span class="nav-child-dot"></span>
                      <span class="nav-child-label">{{ routeRject.meta?.title }}</span>
                    </div>
                  </div>
                </div>
              </template>
            </template>
          </div>

          <!-- Single item (no children) -->
          <div v-else-if="!item.hidde && checkRole(item.meta?.anchors)" class="nav-group">
            <div
              class="nav-item"
              :class="{ 'is-active': isActive(item.path) }"
              @click="navigate(item.path)"
            >
              <div class="nav-item-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                </svg>
              </div>
              <span class="nav-item-label" v-show="!isCollapsed">{{ item.meta?.title }}</span>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useCounter } from "@/store/index.ts";
import { checkRole } from "@/utils/permission.ts";

const props = defineProps<{
  isCollapsed?: boolean;
}>();

const counterStore: any = useCounter();
const router = useRouter();
const route = useRoute();

const {
  options: { routes },
} = router;

const routesData: any = ref([]);
routesData.value = JSON.parse(JSON.stringify(routes));
const expandedMenus = reactive(new Set<string>());

const isActive = (path: string) => {
  return route.path === path;
};

const navigate = (path: string) => {
  router.push(path);
};

const toggleExpand = (path: string) => {
  if (expandedMenus.has(path)) {
    expandedMenus.delete(path);
  } else {
    expandedMenus.add(path);
  }
};

const getUserResourceApi = () => {
  counterStore.getRoutes(routes);
};
getUserResourceApi();
</script>

<style scoped lang="less">
.saas-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-group {
  display: flex;
  flex-direction: column;
}

.nav-group-title {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--saas-text-muted);
  padding: 16px 12px 6px;
  user-select: none;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--saas-sidebar-text);
  transition: all 0.15s ease;
  user-select: none;
  position: relative;
}
.nav-item:hover {
  background: var(--saas-sidebar-active-bg);
  color: var(--saas-primary);
}
.nav-item.is-active {
  background: var(--saas-sidebar-active-bg);
  color: var(--saas-primary);
  font-weight: 600;
}
.nav-item.is-active::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: var(--saas-primary);
  border-radius: 0 3px 3px 0;
}

.nav-item-icon {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-item-label {
  flex: 1;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-arrow {
  flex-shrink: 0;
  transition: transform 0.2s ease;
}
.nav-item.is-expanded .nav-arrow {
  transform: rotate(180deg);
}

.nav-children {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 30px;
  margin-top: 2px;
}

.nav-child-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: var(--saas-sidebar-text);
  font-size: 13px;
  transition: all 0.15s ease;
}
.nav-child-item:hover {
  background: var(--saas-sidebar-active-bg);
  color: var(--saas-primary);
}
.nav-child-item.is-active {
  color: var(--saas-primary);
  font-weight: 600;
}

.nav-child-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--saas-text-muted);
  flex-shrink: 0;
}
.nav-child-item.is-active .nav-child-dot {
  background: var(--saas-primary);
}

.nav-child-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
