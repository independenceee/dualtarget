package utils

import (
	"fmt"
	"net/http"
	"time"

	"github.com/vicanso/go-axios"
)

func HttpRequest() *axios.Instance {
	instance := axios.NewInstance(&axios.InstanceConfig{
		BaseURL:     "https://www.baidu.com",
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
