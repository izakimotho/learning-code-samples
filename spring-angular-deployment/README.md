# Spring Angular Deployment -- Deploying Spring Boot and Angular as a Single App


Spring and Angular are two great frameworks that we all often use to build our applications since their features make our life easier. Sometimes we need the backend and the frontend in one project to package it as a single unit, that’s why in this article I’ll show you how to deploy Spring Boot and Angular as a single app.

Creating Spring Boot and Angular Projects
Before deploying our app we first need to create and configure the frontend and backend projects. Let’s start by creating the backend project first.

##  Backend Project
You can use Spring Initializr or create the project from scratch.

After initializing the project, add the Spring Boot parent.

```code
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>3.1.0</version>
</parent>

```
Next add the following dependency.

```
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
</dependencies>

```
Now create a simple class with the main method.

```
@SpringBootApplication
public class App {
    public static void main(String[] args) {
        SpringApplication.run(App.class, args);
    }
}

```
Create a controller to get the version of the app.

```
@RestController
@RequestMapping("/api/system")
public class SystemController {
    @GetMapping("/version")
    public ResponseEntity<Map<String, String>> getVersion() {
        return ResponseEntity.ok(Map.of("version", "1.0.0"));
    }
}

```
Finally, create another controller that will be used to redirect URLs that Spring doesn’t know about to Angular and let it handle routing.

```
@Controller
public class IndexController implements ErrorController {
    @RequestMapping(value = "${server.error.path:${error.path:/error}}")
    public String error() {
        return "forward:/index.html";
    }
}

```
With the above configuration, we’ve created a simple app which exposes a REST API to get the app’s version. Now Let’s move to the next step.

##  Frontend Project
In order to generate and run the Angular project, you’ll need Node.js installed, so make sure you’ve already installed it.

Install the Angular CLI which is a command-line interface tool that you use to initialize, develop, scaffold, and maintain Angular applications directly from a command shell. Run the following command in your terminal:

```
npm i @angular/cli

```
After that, navigate to the src folder of your Spring project and run the command:

```
ng new --standalone

```
This command will trigger the project initialization, while the standalone flag makes sure that the project will use standalone components instead of modules. Now name the project as frontend and leave the rest as default.

Once the project has been initialized, create a file named system.service.ts and paste the following code:

```
@Injectable({
  providedIn: "root"
})
export class SystemService {
  constructor(private httpClient: HttpClient) { }
  public getVersion(): Observable<{ version: string }> {
    return this.httpClient.get<{ version: string }>("/api/system/version");
  }
}

```
Right now if we run our Spring Boot app it will be available on port 8080 while our Angular dev server will be on port 4200. This configuration will generate CORS errors, so to overcome this problem create a file named proxy.conf.json in the src folder and paste the following code:

```
{
  "/api": {
    "target": "http://localhost:8080",
    "secure:": false
  }
}

```
After that, we need to tell Angular to use our proxy conf, so edit angular.json file and add the following code inside the serve property:

```
"options": {
    "proxyConfig": "src/proxy.conf.json"
}

```
Next replace app.component.ts content with the following code:

```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AppComponent implements OnInit {
  public version$!: Observable<string>;
  constructor(private systemService: SystemService) { }
  ngOnInit(): void {
    this.version$ = this.systemService.getVersion().pipe(map(value => value.version));
  }
}

```
Finally, replace app.component.html with the following code:

```
<h1>Hi There</h1>
<h3>App version is: {{version$ | async }}</h3>

```
## Plugins Configuration
Now that everything is ready, we can finally focus on deploying Angular and Spring as a single app. To do that, we’ll use a Maven plugin called frontend-maven-plugin. Thanks to it, we can build both frontend and backend with just one click and using other plugins we’ll package the result into one file which in this case will be a .jar.

### Frontend Configuration
Next, we need to configure frontend-maven-plugin which comes with a set of built-in commands.

```
<plugin>
    <groupId>com.github.eirslett</groupId>
    <artifactId>frontend-maven-plugin</artifactId>
    <version>1.13.3</version>
    <executions>
        <execution>
            <id>install node and npm</id>
            <goals>
                <goal>install-node-and-npm</goal>
            </goals>
            <phase>generate-resources</phase>
        </execution>
        <execution>
            <id>npm install</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <configuration>
                <arguments>install</arguments>
            </configuration>
        </execution>
        <execution>
            <id>npm run build</id>
            <goals>
                <goal>npm</goal>
            </goals>
            <configuration>
                <arguments>run build</arguments>
            </configuration>
        </execution>
    </executions>
    <configuration>
        <nodeVersion>v18.16.1</nodeVersion>
        <installDirectory>target</installDirectory>
        <workingDirectory>src/frontend</workingDirectory>
    </configuration>
</plugin>

```
In the executions, we install node and npm, then we install the dependencies and finally we run the build script. In the configuration tag, we implement the working directory, select the Node.js version and choose where to install it.

### Backend Configuration
After building the frontend, we need to get the build result and add it to our Spring Boot project before it gets built. To do so we’ll use maven-resources-plugin which handles the copying of project resources to the output directory.

```
<plugin>
    <artifactId>maven-resources-plugin</artifactId>
    <executions>
        <execution>
            <id>copy-frontend</id>
            <phase>generate-resources</phase>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <configuration>
                <outputDirectory>${project.build.directory}/classes/static/</outputDirectory>
                <resources>
                    <resource>
                        <directory>/src/frontend/dist/frontend</directory>
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>

```
In the configuration tag we simply configure to copy the build result of Angular into our static folder where Spring will serve it.

Next add spring-boot-maven-plugin which we’ll use to build our final .jar.

```
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>

```
### Building the Projects
At this point it’s time to build our projects by running mvn clean install.
After building the application, in the backend is generated the target/ folder which contains angular-spring-deployment.jar and in the frontend is generated the dist/ folder and node_modules.

#### Application Testing
Now that we’ve built the project, we can finally test if our app works properly.

- Open the terminal and navigate to your project /target folder.
- Run java -jar spring-angular-deployment.jar.
- Open the browser and type the following url: http://localhost:8080
- Deploying Spring Boot and Angular as a Single App
The app is working fine, we are able to get version from the backend and display it in our frontend.

## Conclusion
We have created a Spring Boot app and added a front end to it using Angular. Using this configuration a backend developer can deploy the app without knowing how to build the frontend, while the frontend developer can easily update and test the frontend from a regular IDE by running the app in the usual way.
