package com.poster;

import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import javax.validation.Valid;

@Configuration
@EnableSwagger2 // 启用 Swagger
public class SwaggerConfig {

    @Value("${swagger.enbale}")
    private boolean enable;

    @Bean
    public Docket createRestApi() {
        Docket docket;
        if (enable) {
            docket = new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).select()
                    // 标示只有被 @Api 标注的才能生成API.
                    .apis(RequestHandlerSelectors.withClassAnnotation(Api.class)).paths(PathSelectors.any()).build();
        } else {
            docket = new Docket(DocumentationType.SWAGGER_2).apiInfo(new ApiInfo("", "", "", "", "", "", "")).select()
                    .apis(RequestHandlerSelectors.none()).build();


        }
        return docket;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title("接口列表")// 大标题
                .version("1.0")// 版本
                .build();
    }
}