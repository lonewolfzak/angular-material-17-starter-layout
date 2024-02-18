import { Component, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BooleanInput } from '@angular/cdk/coercion';
import { filter, map, switchMap } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatIconModule, MatSidenavModule, MatButtonModule, MatListModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})


export class AppComponent {
  sidebarCollapsed = signal<BooleanInput>(false);
  sidebarItems = signal<ISidebarItem[]>([
    {
      title: "Dashboard",
      icon: "dashboard",
      route: "/dashboard"
    },
    {
      title: "Users",
      icon: "person",
      route: "/users"
    },
    {
      title: "Roles",
      icon: "security",
      route: "/roles"
    },
    {
      title: "Settings",
      icon: "settings",
      route: "/settings"
    },
  ])
  title: any;

  constructor(private router: Router,

    private titleService: Title,
    private activatedRoute: ActivatedRoute,) {
    // Change page title on navigation or language change, based on route data
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    onNavigationEnd
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route: any) => route.outlet === 'primary'),
        switchMap((route: any) => route.data)
      )
      .subscribe((event: any) => {
        this.title = event.title
        this.titleService.setTitle(event.title);
      });

  }
}


interface ISidebarItem {
  title: string,
  icon: string,
  route: string
};