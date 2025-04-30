import { tokens } from "./handleTokens";

class FetchConfig {
  private api;
  private METHODS = {
    GET: "GET",
    POST: "POST",
    PATCH: "PATCH",
    PUT: "PUT",
    DELETE: "DELETE",
    OPTIONS: "OPTIONS",
    HEAD: "HEAD",
  };

  constructor(api: string) {
    if (String(api).endsWith("/")) {
      api = String(api).slice(0, api.length - 1);
    }
    this.api = api;
  }

  private createFormData(
    jsonData:
      | {
          [key: string]: any;
        }
      | undefined,
    files:
      | {
          [key: string]: File[];
        }
      | undefined,
  ) {
    const newFormData = new FormData();

    for (let key in jsonData) {
      newFormData.append(String(key), jsonData[key]);
    }

    for (let key in files) {
      if (!files[key]) continue;
      for (let i = 0; i < files[key]?.length; i++) {
        newFormData.append(String(key), files[key][i]);
      }
    }

    return newFormData;
  }

  //GET REQUEST
  private call = async (url: string, method: string, formData: FormData) => {
    try {
      const res = await fetch(String(this.api) + String(url), {
        method: method,
        credentials: "include",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: tokens.getAccessToken(),
        } as HeadersInit,
        body: formData,
      });

      const response = await res.json();
      return response;
    } catch (error) {
      return error;
    }
  };

  async get(
    url = "",
    formData:
      | {
          [key: string]: any;
        }
      | undefined = undefined,
    files:
      | {
          [key: string]: File[];
        }
      | undefined = undefined,
  ) {
    try {
      const res = await this.call(
        url,
        this.METHODS.GET,
        this.createFormData(formData, files),
      );
      return res;
    } catch (error) {
      return error;
    }
  }
  async post(
    url = "",
    formData:
      | {
          [key: string]: any;
        }
      | undefined = undefined,
    files:
      | {
          [key: string]: File[];
        }
      | undefined = undefined,
  ) {
    try {
      const res = await this.call(
        url,
        this.METHODS.POST,
        this.createFormData(formData, files),
      );
      return res;
    } catch (error) {
      return error;
    }
  }
  async put(
    url = "",
    formData:
      | {
          [key: string]: any;
        }
      | undefined = undefined,
    files:
      | {
          [key: string]: File[];
        }
      | undefined = undefined,
  ) {
    try {
      const res = await this.call(
        url,
        this.METHODS.PUT,
        this.createFormData(formData, files),
      );
      return res;
    } catch (error) {
      return error;
    }
  }
  async patch(
    url = "",
    formData:
      | {
          [key: string]: any;
        }
      | undefined = undefined,
    files:
      | {
          [key: string]: File[];
        }
      | undefined = undefined,
  ) {
    try {
      const res = await this.call(
        url,
        this.METHODS.PATCH,
        this.createFormData(formData, files),
      );
      return res;
    } catch (error) {
      return error;
    }
  }
  async options(
    url = "",
    formData:
      | {
          [key: string]: any;
        }
      | undefined = undefined,
    files:
      | {
          [key: string]: File[];
        }
      | undefined = undefined,
  ) {
    try {
      const res = await this.call(
        url,
        this.METHODS.OPTIONS,
        this.createFormData(formData, files),
      );
      return res;
    } catch (error) {
      return error;
    }
  }
  async head(
    url = "",
    formData:
      | {
          [key: string]: any;
        }
      | undefined = undefined,
    files:
      | {
          [key: string]: File[];
        }
      | undefined = undefined,
  ) {
    try {
      const res = await this.call(
        url,
        this.METHODS.HEAD,
        this.createFormData(formData, files),
      );
      return res;
    } catch (error) {
      return error;
    }
  }
}

const api = new FetchConfig(import.meta.env.VITE_SERVER_URL);

export { api };
