package utils

import (
	"fmt"
	"log"
	"net/http"
	"net/url"
	"time"

	"github.com/vicanso/go-axios"
)

func HttpRequest() *axios.Instance {
	instance := axios.NewInstance(&axios.InstanceConfig{
		BaseURL:     "https=/preprod.koios.rest/api/v1",
		EnableTrace: true,
		Client: &http.Client{
			Transport: &http.Transport{
				Proxy: http.ProxyFromEnvironment,
			},
		},
		Timeout: 10 * time.Second,
		OnDone: func(config *axios.Config, resp *axios.Response, err error) {
			fmt.Println(config)
			fmt.Println(resp)
			fmt.Println(err)
		},
	})

	return instance
}

func Get(path string, query ...url.Values) []byte {
	response, err := HttpRequest().Get(path, query...)
	if err != nil {
		log.Fatal("Failed to GET")
	}

	return response.Data
}

func Post(path string, data interface{}, query ...url.Values) []byte {
	response, err := HttpRequest().Post(path, data, query...)
	if err != nil {
		log.Fatal("Failed to POST")
	}

	return response.Data
}

func Patch(path string, data interface{}, query ...url.Values) []byte {
	response, err := HttpRequest().Patch(path, data, query...)
	if err != nil {
		log.Fatal("Failed to PATCH")
	}

	return response.Data
}

func Delete(path string, query ...url.Values) []byte {
	response, err := HttpRequest().Delete(path, query...)
	if err != nil {
		log.Fatal("Failed to DELETE")
	}

	return response.Data
}
